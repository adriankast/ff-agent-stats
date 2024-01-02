import { useEffect, useRef } from "react";

interface Props {
  value: number;
  label: string;
  animationDuration?: number;
}

// TODO: module css

export default function CircledNumber({value, label, animationDuration = 1000}: Props) {

    const valueBox = useRef(null);
    const valueCircle = useRef(null);

    useEffect(() => {
      if (valueBox.current && valueCircle.current) {
        animateValue(valueBox.current, 0, value, animationDuration);
        animateCircleFill(valueCircle.current, animationDuration);
      } else {
        console.log("no year box/circle not defined for element: " + label);
      }
  
    }, [value, animationDuration, label]);
  
    return (
      <div>
        <h3>{label}</h3>
        <div id="ffMissionCount">
          <div className="note-display">
            <div className="circle" id="ffMissionCount--valueCircle" ref={valueCircle}>
              <svg width="66" height="66" className="circle__svg">
                <circle
                  cx="33"
                  cy="33"
                  r="30"
                  className="circle__progress circle__progress--fill"
                ></circle>
              </svg>
              <div id="ffMissionCount--value" ref={valueBox}></div>
            </div>
          </div>
        </div>
      </div>
    );
}



function animateValue(
  obj: HTMLElement,
  start: number,
  end: number,
  duration: number
) {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start).toString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function animateCircleFill(targetParent: HTMLElement, duration: number) {
  var cObj = targetParent.querySelector<SVGCircleElement>(
    ".circle__progress--fill"
  );
  if (!cObj) throw new Error("cObj is not defined");
  let radius = cObj.r.baseVal.value;
  let circumference = 2 * Math.PI * radius;
  let offset = 0;

  cObj.style.setProperty("--initialStroke", circumference.toString());
  cObj.style.setProperty("display", "initial");

  setTimeout(
    (cObj) => {
      cObj.style.setProperty("--transitionDuration", `${duration}ms`);
      cObj.style.strokeDashoffset = offset.toString();
    },
    100,
    cObj
  );
}

