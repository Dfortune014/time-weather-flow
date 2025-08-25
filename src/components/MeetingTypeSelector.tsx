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
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer glass-effect">
          <RadioGroupItem value="virtual" id="virtual" />
          <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
            <Monitor className="w-4 h-4 text-primary" />
            <div>
              <div className="font-medium text-foreground">Virtual Meeting</div>
              <div className="text-sm text-muted-foreground">Online video call</div>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer glass-effect">
          <RadioGroupItem value="in-person" id="in-person" />
          <Label htmlFor="in-person" className="flex items-center gap-2 cursor-pointer">
            <MapPin className="w-4 h-4 text-primary" />
            <div>
              <div className="font-medium text-foreground">In-Person Meeting</div>
              <div className="text-sm text-muted-foreground">Weather will be considered</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </Card>
  );
};