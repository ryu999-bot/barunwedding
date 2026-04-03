"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ServicesData {
  hero: { image: string; title: string };
  items: ServiceItem[];
}

export default function ServicesPage() {
  const [data, setData] = useState<ServicesData | null>(null);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((json) => setData(json.services))
      .catch(console.error);
  }, []);

  if (!data) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[350px] lg:h-[450px] bg-[#212121] overflow-hidden">
        <Image src={data.hero.image} alt="웨딩 서비스" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-serif text-white/60 text-[14px] tracking-[4px] uppercase mb-4">Services</p>
            <h1 className="font-serif text-4xl lg:text-6xl text-white tracking-[1px]">{data.hero.title}</h1>
            <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
        <div className="space-y-0">
          {data.items.map((service, i) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
            >
              <div className={`aspect-[16/10] lg:aspect-auto lg:min-h-[400px] relative bg-[#f2f0ed] overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image src={service.image} alt={service.title} fill className="object-cover" sizes="50vw" />
              </div>
              <div className={`bg-[#f7f6f3] p-10 lg:p-16 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-[11px] text-sage tracking-[3px] uppercase">0{i + 1}</span>
                <h3 className="font-serif text-2xl lg:text-3xl text-[#212121] mt-3 mb-4">{service.title}</h3>
                <p className="text-[13px] text-[#6b6b6b] leading-[1.9] mb-6">{service.description}</p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-[13px] text-sage hover:text-sage-dark tracking-[1px] transition-colors duration-300 border-b border-sage/30 pb-1 self-start"
                >
                  자세히 보기 <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
