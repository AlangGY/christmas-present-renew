export class Present {
  id: number;
  owner: string;
  title: string;
  description: string;

  constructor(id: number, owner: string, title: string, description: string) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.description = description;
  }
}
