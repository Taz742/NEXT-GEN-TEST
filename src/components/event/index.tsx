import type React from "react";
import type { IEvent } from "../../types/event";

interface IProps {
  event: IEvent;
}

export const Event: React.FC<IProps> = ({ event }) => {
  const date = `${event.match_date[4]}${event.match_date[5]}/${event.match_date[6]}${event.match_date[7]}`;
  const hour = `${event.match_date[8]}${event.match_date[9]}`;
  const minutes = `${event.match_date[10]}${event.match_date[11]}`;

  function getAmPm(hour: number) {
    if (hour < 0 || hour > 23) {
      return "Invalid hour";
    } else if (hour === 0 || hour === 24) {
      return "AM";
    } else if (hour > 0 && hour < 12) {
      return "AM";
    } else if (hour === 12) {
      return "PM";
    } else {
      return "PM";
    }
  }

  const converTime = (time: string) => {
    let hour = +time.split(":")[0];
    let min = time.split(":")[1];

    min = (min + "").length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = ((hour + "").length == 1 ? `0${hour}` : hour) as any;

    return `${hour}:${min}`;
  };

  const timeLabel = getAmPm(Number(hour));

  const [oddsHome, foo] = event.odds_home.split("|");
  const [oddsAway, bar] = event.odds_away.split("|");

  const [handicapLeft, handicapRight] = event.handicap_display.split("|");

  return (
    <div className="event">
      {event.match_date && (
        <div className="event-time">
          <p>{date}</p>
          <p>{converTime(`${hour}:${minutes}`)}</p>
          <p>{timeLabel}</p>
        </div>
      )}
      <div className="event-match">
        {event.club_home && (
          <p style={{ color: handicapLeft ? "red" : "black" }}>
            {event.club_home}
          </p>
        )}
        <p style={{ color: !handicapLeft ? "red" : "black" }}>
          {event.club_away}
        </p>
      </div>
      <div className="event-odds">
        <div className="odds">
          <p className="handicap-time">{`${
            handicapLeft ? handicapLeft : ""
          } ${Number(oddsHome).toFixed(2)}`}</p>
          <p className="handicap-time">{`${
            handicapRight ? handicapRight : ""
          } ${Number(oddsAway).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  );
};
