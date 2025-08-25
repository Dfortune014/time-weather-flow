import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Monitor, MapPin } from "lucide-react";

interface MeetingTypeSelectorProps {
  selectedType: "virtual" | "in-person";
  onTypeChange: (type: "virtual" | "in-person") => void;
}

export const MeetingTypeSelector = ({ 
  selectedType, 
  onTypeChange 
}: MeetingTypeSelectorProps) => {
  return (
    <Card className="glass-effect animate-slide-up p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Monitor className="w-4 h-4" />
        </div>
        Meeting Type
      </h3>
      
      <RadioGroup 
        value={selectedType} 
        onValueChange={(value) => onTypeChange(value as "virtual" | "in-person")}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="flex items-center justify-center space-x-3 p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer glass-effect w-full">
          <RadioGroupItem value="virtual" id="virtual" />
          <Label htmlFor="virtual" className="flex items-center gap-3 cursor-pointer flex-1 justify-center">
            <Monitor className="w-5 h-5 text-primary" />
            <div className="text-center">
              <div className="font-medium text-foreground">Virtual Meeting</div>
              <div className="text-sm text-muted-foreground">Online video call</div>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center justify-center space-x-3 p-6 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer glass-effect w-full">
          <RadioGroupItem value="in-person" id="in-person" />
          <Label htmlFor="in-person" className="flex items-center gap-3 cursor-pointer flex-1 justify-center">
            <MapPin className="w-5 h-5 text-primary" />
            <div className="text-center">
              <div className="font-medium text-foreground">In-Person Meeting</div>
              <div className="text-sm text-muted-foreground">Weather will be considered</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </Card>
  );
};