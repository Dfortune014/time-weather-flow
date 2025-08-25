import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Search } from "lucide-react";

interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

export const LocationSelector = ({ 
  currentLocation, 
  onLocationChange 
}: LocationSelectorProps) => {
  const [inputLocation, setInputLocation] = useState(currentLocation);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLocationUpdate = async () => {
    if (inputLocation.trim() && inputLocation !== currentLocation) {
      setIsUpdating(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLocationChange(inputLocation.trim());
      setIsUpdating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLocationUpdate();
    }
  };

  return (
    <Card className="glass-effect animate-slide-up p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Location for Weather
          </h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm text-muted-foreground">
            Enter city name or zip code
          </Label>
          <div className="flex gap-2">
            <Input
              id="location"
              type="text"
              placeholder="e.g., San Francisco, CA or 94105"
              value={inputLocation}
              onChange={(e) => setInputLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-border/50 focus:border-primary/50 transition-colors"
              disabled={isUpdating}
            />
            <Button
              onClick={handleLocationUpdate}
              disabled={!inputLocation.trim() || inputLocation === currentLocation || isUpdating}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
            >
              {isUpdating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          This location will be used to get weather conditions for in-person meeting recommendations.
        </p>
      </div>
    </Card>
  );
};