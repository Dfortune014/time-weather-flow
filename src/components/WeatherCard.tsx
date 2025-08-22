import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  description: string;
  location: string;
}

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

const WeatherIcon = ({ condition }: { condition: WeatherData["condition"] }) => {
  const icons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
    snowy: CloudSnow,
    windy: Wind,
  };
  
  const Icon = icons[condition];
  return <Icon className="w-6 h-6 text-primary animate-float" />;
};

export const WeatherCard = ({ weather, className = "" }: WeatherCardProps) => {
  return (
    <Card className={`glass-effect p-4 animate-scale-in ${className}`}>
      <div className="flex items-center gap-3">
        <WeatherIcon condition={weather.condition} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              {weather.temperature}°
            </span>
            <span className="text-sm text-muted-foreground">
              {weather.location}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {weather.description}
          </p>
        </div>
      </div>
    </Card>
  );
};