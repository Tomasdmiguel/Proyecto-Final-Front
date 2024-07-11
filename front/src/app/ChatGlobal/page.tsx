"use client";
import React from "react";
import Chat from "@/components/chat/chat";
import { useSport } from "@/context/SportContext";

export default function ChatGlobal() {
  const { sport } = useSport();
  let deporte = "";
  if (sport == 1) {
    deporte = "Futbol";
  } else if (sport == 2) {
    deporte = "Padel";
  } else if (sport == 3) {
    deporte = "Tenis";
  }

  return (
    <div>
      <Chat deporte={deporte} />
    </div>
  );
}
