'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RoadBackground } from '@/components/RoadBackground';
import { Hero } from '@/components/sections/Hero';
import { DriverProfile } from '@/components/sections/DriverProfile';
import { Blacklist } from '@/components/sections/Blacklist';
import { UnderTheHood } from '@/components/sections/UnderTheHood';
import { Dispatch } from '@/components/sections/Dispatch';
import { IntroSplash } from '@/components/IntroSplash';

export default function Page() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {/* Intro Splash with Siren */}
      {!entered && <IntroSplash onEnter={() => setEntered(true)} />}

      {/* Main Site */}
      <div className={`transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <RoadBackground />

        <div className="relative z-10">
          <Navbar />

          <main className="overflow-x-hidden">
            <Hero />
            <DriverProfile />
            <Blacklist />
            <UnderTheHood />
            <Dispatch />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}
