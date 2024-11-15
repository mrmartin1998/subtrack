"use client";

import React, { Suspense } from "react";
import AddSubscriptionForm from "./AddSubscriptionForm";

export default function AddSubscriptionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddSubscriptionForm />
    </Suspense>
  );
}
