import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz"; 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import CancelMeetingButton from "./cancel-meeting";

// Set the time zone for IST
const timeZone = "Asia/Kolkata";

export default function MeetingList({ meetings, type }) {
  if (meetings.length === 0) {
    return <p>No {type} meetings found.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => {
        // Convert the UTC time to IST
        const startTime = utcToZonedTime(new Date(meeting.startTime), timeZone);
        const endTime = utcToZonedTime(new Date(meeting.endTime), timeZone);

        return (
          <Card key={meeting.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{meeting.event.title}</CardTitle>
              <CardDescription>with {meeting.name}</CardDescription>
              <CardDescription>
                &quot;{meeting.additionalInfo}&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{format(startTime, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
                </span>
              </div>
              {meeting.meetLink && (
                <div className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  <a
                    href={meeting.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Join Meeting
                  </a>
                </div>
              )}
            </CardContent>
            {type === "upcoming" && (
              <CardFooter className="flex justify-between">
                <CancelMeetingButton meetingId={meeting.id} />
              </CardFooter>
            )}
          </Card>
        );
      })}
    </div>
  );
}
