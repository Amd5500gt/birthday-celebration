export interface MemoryItem {
  id: number;
  monthTitle: string;
  dateStr: string;
  caption: string;
  localPath: string;
}

export interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export interface FloatingHeart {
  id: number;
  x: number; // percentage width
  size: number; // in pixels
  color: string;
  speed: number; // duration of translation
  delay: number;
}

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
  size: number;
}
