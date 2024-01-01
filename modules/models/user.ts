import { Color } from "./Color";

export class User {
  name: string;
  personalColor: Color;

  constructor(name: string, color?: string) {
    this.name = name;
    this.personalColor = new Color(color ?? "gray");
  }
}
