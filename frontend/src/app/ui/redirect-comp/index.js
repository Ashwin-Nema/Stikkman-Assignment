'use client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RouteNavigator({
  route = '/',
  navigationTime = 2000,
  navigate,
}) {
  const [goToHome, setGoToHome] = useState(false);

  useEffect(() => {
    if (!navigate) {
      return;
    }

    setTimeout(() => {
      setGoToHome(true);
    }, navigationTime);
  }, [navigationTime, navigate]);

  useEffect(() => {
    if (goToHome) {
      redirect(route);
    }
  }, [goToHome]);

  return <></>;
}
