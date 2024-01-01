import { User } from "@/modules/models/user";
import supabaseClient from "../supabase/SupabaseClient";
import { Present } from "@/modules/models/present";
import { RealtimeChannel } from "@supabase/supabase-js";

export type PresenceState = {
  user: User;
  present?: Present;
};

export class RoomFetcher {
  realtimeClient = supabaseClient;
  channel: RealtimeChannel | null = null;
  onSyncState?: (payload: PresenceState[]) => void;

  async joinRoom(roomId: string, user: User) {
    const channel = this.realtimeClient.channel(`room:${roomId}`, {
      config: {
        presence: {
          key: roomId,
        },
      },
    });
    this.channel = channel;
    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
      const presenceTrackStatus = await channel.track({ user });
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState<PresenceState>();
        this.onSyncState?.(newState[roomId]);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {})
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {})
      .subscribe();
  }

  async postPresent(user: User, present: Present) {
    if (!this.channel) return;
    const presenceTrackStatus = await this.channel.track({
      user,
      present,
    });
    console.log(presenceTrackStatus);
  }

  onReceiveMessage(payload: any) {}

  setOnSyncState(cb: (payload: any) => void) {
    this.onSyncState = cb;
  }
}
