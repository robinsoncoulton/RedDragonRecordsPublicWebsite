import React from "react";
import { VinylRecord, Circle } from "./styles";

interface RecordProps {
  size?: number;
}

const Record: React.FC<RecordProps> = ({ size = 0.5 }) => (
  <VinylRecord diameter={size * 35}>
    <Circle diameter={size * 34} />
    <Circle diameter={size * 32} />
    <Circle diameter={size * 30} />
    <Circle diameter={size * 28} />
    <Circle diameter={size * 26} />
    <Circle diameter={size * 24} />
    <Circle diameter={size * 22} />
    <Circle diameter={size * 20} />
    <Circle diameter={size * 18} />
    <Circle diameter={size * 16} />
    <Circle diameter={size * 14} color={"white"} />
    <Circle diameter={size * 2} color={"black"} />
  </VinylRecord>
);

export default Record;
