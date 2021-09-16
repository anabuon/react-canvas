import { drawLine } from "./drawLine";

export const drawRectangle = (x1, y1, x2, y2) => {
        drawLine(x1, y1, x2, y1);
        drawLine(x2, y1, x2, y2);
        drawLine(x2, y2, x1, y2);
        drawLine(x1, y2, x1, y1);
   
    }
