import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

interface CalendarStatusProps {
  isConnected: boolean;
  onConnect: () => void;
  className?: string;
}

export const CalendarStatus = ({ 
  isConnected, 
  onConnect, 
  className = "" 
}: CalendarStatusProps) => {
  return (
    <Card className={`glass-effect p-4 animate-scale-in ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            isConnected 
              ? "bg-green-100 text-green-600" 
              : "bg-orange-100 text-orange-600"
          }`}>
            {isConnected ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-foreground">
              {isConnected ? "Calendar Connected" : "Connect Calendar"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isConnected 
                ? "Your Google Calendar is linked and ready" 
                : "Connect to check your availability"
              }
            </p>
          </div>
        </div>
        
        {!isConnected && (
          <Button
            onClick={onConnect}
            variant="outline"
            size="sm"
            className="glass-effect border-primary/20 hover:bg-primary/10 transition-all duration-300"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Connect
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>
    </Card>
  );
};