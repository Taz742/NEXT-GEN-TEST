import type React from "react";
import type { IEvent } from "../../types/event";
import { Event } from "../event";
import { useState } from "react";

interface IProps {
  eventName: string;
  events: IEvent[];
}

export const Events: React.FC<IProps> = ({ eventName, events }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="events">
      <div className="events-header">
        <div onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <>&uarr;</> : <>&darr;</>}
        </div>
        <h2 className="events-name">{eventName}</h2>
        <div className="events-count">{events.length}</div>
      </div>
      {!collapsed && (
        <>
          {events.map((event, index) => {
            return <Event key={index} event={event} />;
          })}
        </>
      )}
    </div>
  );
};
