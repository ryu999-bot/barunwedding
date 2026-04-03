"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Calendar, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { fetchCollection, saveItem, deleteItem } from "@/lib/admin-api";

interface AdminEvent {
  id: number;
  title: string;
  period: string;
  status: "진행중" | "예정" | "종료";
  visible: boolean;
}

const statusColors: Record<string, string> = {
  진행중: "bg-green-100 text-green-700",
  예정: "bg-blue-100 text-blue-700",
  종료: "bg-gray-100 text-gray-500",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchCollection<AdminEvent>("events");
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const toggleVisibility = async (id: number) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;
    try {
      await saveItem("events", { ...event, visible: !event.visible });
      await loadEvents();
    } catch (err) {
      console.error("Failed to toggle visibility:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("이 이벤트를 삭제하시겠습니까?")) {
      try {
        await deleteItem("events", String(id));
        await loadEvents();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-muted-foreground">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy">이벤트 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            총 {events.length}개의 이벤트 | 진행중{" "}
            {events.filter((e) => e.status === "진행중").length}개
          </p>
        </div>
        <Link href="/admin/events/new">
          <Button className="bg-navy hover:bg-navy-light text-white gap-2">
            <Plus className="h-4 w-4" />
            이벤트 등록
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <Card
            key={event.id}
            className={`border-0 shadow-sm transition-opacity ${
              !event.visible ? "opacity-50" : ""
            }`}
          >
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-navy">{event.title}</h3>
                    <Badge
                      className={`text-xs ${statusColors[event.status]}`}
                    >
                      {event.status}
                    </Badge>
                    {!event.visible && (
                      <Badge variant="secondary" className="text-xs">
                        비공개
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {event.period}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {event.visible ? (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={event.visible}
                      onCheckedChange={() => toggleVisibility(event.id)}
                    />
                  </div>
                  <Link href={`/admin/events/${event.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Pencil className="h-3.5 w-3.5" />
                      수정
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    삭제
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
