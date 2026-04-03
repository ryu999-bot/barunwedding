"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Car, Train } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface LocationData {
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
  hours: string[];
  subway: string[];
  parking: string[];
}

export default function LocationPage() {
  const [data, setData] = useState<LocationData | null>(null);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((json) => setData(json.location))
      .catch(console.error);
  }, []);

  if (!data) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#f7f6f3] py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">Location</p>
          <h1 className="font-serif text-3xl lg:text-5xl text-[#212121] tracking-[1px]">찾아오시는 길</h1>
          <div className="w-12 h-[1px] bg-sage mx-auto mt-6" />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map */}
          <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-[#f2f0ed] relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.354!2d127.027!3d37.498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzUyLjgiTiAxMjfCsDAxJzM3LjIiRQ!5e0!3m2!1sko!2skr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="바른웨딩 위치"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="font-serif text-sage text-[14px] tracking-[3px] uppercase mb-3">Contact</p>
              <h2 className="font-serif text-2xl lg:text-3xl text-[#212121] mb-6">바른웨딩 본사</h2>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[14px] font-medium text-[#212121] mb-1">주소</h3>
                    <p className="text-[13px] text-[#6b6b6b]">{data.address}</p>
                    <p className="text-[13px] text-[#6b6b6b]">{data.addressDetail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[14px] font-medium text-[#212121] mb-1">전화</h3>
                    <p className="text-[13px] text-[#6b6b6b]">{data.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[14px] font-medium text-[#212121] mb-1">이메일</h3>
                    <p className="text-[13px] text-[#6b6b6b]">{data.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[14px] font-medium text-[#212121] mb-1">운영시간</h3>
                    {data.hours.map((line, i) => (
                      <p key={i} className={`text-[13px] ${i === data.hours.length - 1 ? "text-[#999]" : "text-[#6b6b6b]"}`}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-[14px] font-medium text-[#212121]">교통 안내</h3>

                <div className="flex items-start gap-4">
                  <Train className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-medium text-[#212121] mb-1">지하철</h4>
                    {data.subway.map((line, i) => (
                      <p key={i} className="text-[13px] text-[#6b6b6b]">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Car className="h-5 w-5 text-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[13px] font-medium text-[#212121] mb-1">주차</h4>
                    {data.parking.map((line, i) => (
                      <p key={i} className="text-[13px] text-[#6b6b6b]">{line}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
