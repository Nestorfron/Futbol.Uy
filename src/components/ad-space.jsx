import { Card } from "@nextui-org/react";


export default function AdSpace({ position }) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl p-4 text-center">
        <div className="text-gray-500 font-bold">
          Espacio para Anuncio ({position === "top" ? "Superior" : "Inferior"})
        </div>
        <div className="text-sm text-gray-400">728x90 Leaderboard</div>
      </Card>
    )
  }
