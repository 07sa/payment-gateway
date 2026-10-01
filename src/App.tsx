/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlanKey, StudentInfo, PricingDetails } from './types';
import { PLANS, AVAILABLE_COUPONS } from './data/mockData';
import { Header } from './components/Header';
import { StepProgress } from './components/StepProgress';
import { HeroBanner } from './components/HeroBanner';
import { PlanSelection } from './components/PlanSelection';
import { CouponSection } from './components/CouponSection';
import { StudentInfoForm } from './components/StudentInfoForm';
import { PaymentQrSection } from './components/PaymentQrSection';
import { OrderSummary } from './components/OrderSummary';
import { PaymentReadyModal } from './components/PaymentReadyModal';
import { SuccessScreen } from './components/SuccessScreen';
import { PracticeArenaDemo } from './components/PracticeArenaDemo';
import { ParentReportDemo } from './components/ParentReportDemo';
import { Toast } from './components/Toast';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'checkout' | 'practice' | 'parent-report'>('checkout');
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('6months');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: 'Aarav Sharma',
    phoneNumber: '9876543210',
    grade: '5',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Notifications & UI states
  const [toast, setToast] = useState<{ show: boolean; heading: string; subheading: string }>({
    show: false,
    heading: '',
    subheading: '',
  });
  const [validationMessage, setValidationMessage] = useState<{
    text: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);

  // Compute pricing details for any plan with current coupon
  const getPlanPricing = (planKey: PlanKey, couponCode: string | null = appliedCoupon): PricingDetails => {
    const plan = PLANS[planKey];
    const regular = plan.regularPrice;
    let discount = 0;

    if (couponCode && AVAILABLE_COUPONS[couponCode]) {
      const c = AVAILABLE_COUPONS[couponCode];
      if (c.type === 'fixed' && c.discounts) {
        discount = c.discounts[planKey] || 0;
      } else if (c.type === 'percent' && c.percent) {
        discount = Math.round(regular * c.percent);
      }
    }

    const finalPrice = Math.max(0, regular - discount);
    const monthlyEquiv = `₹${(finalPrice / plan.months).toFixed(2)} / month`;
    const dailyEquiv = `₹${(finalPrice / plan.days).toFixed(2)} / day`;

    return {
      regular,
      discount,
      finalPrice,
      monthlyEquiv,
      dailyEquiv,
    };
  };

  const currentPricing = getPlanPricing(selectedPlan, appliedCoupon);

  // Step computation
  let currentStep = 1;
  if (studentInfo.fullName.trim() && studentInfo.phoneNumber.length === 10) {
    currentStep = 3;
  } else if (selectedPlan) {
    currentStep = 2;
  }
  if (isSubmitted) {
    currentStep = 4;
  }

  // Handle coupon application
  const handleApplyCoupon = (rawCode: string): boolean => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      setValidationMessage({ text: 'Please enter a valid coupon code.', type: 'error' });
      triggerShake();
      return false;
    }

    if (AVAILABLE_COUPONS[code]) {
      setAppliedCoupon(code);
      const calculated = getPlanPricing(selectedPlan, code);
      setValidationMessage({
        text: `Success! Coupon "${code}" applied. Saved ₹${calculated.discount}!`,
        type: 'success',
      });
      setToast({
        show: true,
        heading: 'COUPON APPLIED!',
        subheading: `You saved ₹${calculated.discount} on your ${PLANS[selectedPlan].title}.`,
      });
      return true;
    } else {
      triggerShake();
      setValidationMessage({
        text: `Coupon code "${code}" is invalid or expired. Try "FIRST100".`,
        type: 'error',
      });
      return false;
    }
  };

  const handleRemoveCoupon = () => {
    if (!appliedCoupon) return;
    const old = appliedCoupon;
    setAppliedCoupon(null);
    setValidationMessage({ text: `Coupon "${old}" removed. Full pricing restored.`, type: 'info' });
  };

  const triggerShake = () => {
    setShakeTrigger(true);
    setTimeout(() => setShakeTrigger(false), 500);
  };

  const handleFocusCoupon = () => {
    const input = document.getElementById('couponInputField');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePaymentCompletedClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    setIsModalOpen(false);
    setIsSubmitted(true);
  };

  const handleResetCheckout = () => {
    setIsSubmitted(false);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans antialiased min-h-screen selection:bg-cyan-500 selection:text-white">
      {/* Toast Notification */}
      <Toast
        show={toast.show}
        heading={toast.heading}
        subheading={toast.subheading}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedGrade={studentInfo.grade}
      />

      {/* Main Tab Routing */}
      {currentTab === 'practice' ? (
        <PracticeArenaDemo
          studentName={studentInfo.fullName}
          grade={studentInfo.grade}
          onGoToCheckout={() => setCurrentTab('checkout')}
        />
      ) : currentTab === 'parent-report' ? (
        <ParentReportDemo
          studentName={studentInfo.fullName}
          phone={studentInfo.phoneNumber}
          grade={studentInfo.grade}
          onGoToCheckout={() => setCurrentTab('checkout')}
        />
      ) : isSubmitted ? (
        /* STEP 4: Success Screen */
        <SuccessScreen
          studentInfo={studentInfo}
          selectedPlan={selectedPlan}
          appliedCoupon={appliedCoupon}
          pricing={currentPricing}
          onReset={handleResetCheckout}
          onOpenArena={() => setCurrentTab('practice')}
        />
      ) : (
        /* STEP 1-3: Checkout Workspace */
        <>
          {/* Progress Indicator Bar */}
          <StepProgress currentStep={currentStep} />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            {/* Launch Coupon Hero Banner */}
            <HeroBanner
              appliedCoupon={appliedCoupon}
              discount={currentPricing.discount}
              onApplyCoupon={handleApplyCoupon}
            />

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Flow Steps (col-8) */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                {/* Step 1: Plan Selection */}
                <PlanSelection
                  selectedPlan={selectedPlan}
                  onSelectPlan={(plan) => setSelectedPlan(plan)}
                  getPlanPricing={getPlanPricing}
                  appliedCoupon={appliedCoupon}
                />

                {/* Step 1.5: Coupon Section */}
                <CouponSection
                  appliedCoupon={appliedCoupon}
                  currentDiscount={currentPricing.discount}
                  onApplyCoupon={handleApplyCoupon}
                  onRemoveCoupon={handleRemoveCoupon}
                  validationMessage={validationMessage}
                  shakeTrigger={shakeTrigger}
                />

                {/* Step 2: Student Details Form */}
                <StudentInfoForm
                  studentInfo={studentInfo}
                  onChange={(partial) => setStudentInfo((prev) => ({ ...prev, ...partial }))}
                />

                {/* Step 3: UPI QR Payment */}
                <PaymentQrSection
                  finalAmount={currentPricing.finalPrice}
                  onConfirmPaid={handlePaymentCompletedClick}
                />
              </div>

              {/* Right Column: Order Summary (col-4) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                <OrderSummary
                  selectedPlan={selectedPlan}
                  pricing={currentPricing}
                  appliedCoupon={appliedCoupon}
                  onApplyCoupon={handleApplyCoupon}
                  onRemoveCoupon={handleRemoveCoupon}
                  onFocusCouponInput={handleFocusCoupon}
                />
              </div>
            </div>
          </main>
        </>
      )}

      {/* Step 3.5: Payment Details Ready Modal */}
      <PaymentReadyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studentInfo={studentInfo}
        selectedPlan={selectedPlan}
        appliedCoupon={appliedCoupon}
        pricing={currentPricing}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
