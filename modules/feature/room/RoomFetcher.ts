import { User } from "@/modules/models/user";
import supabaseClient from "../supabase/SupabaseClient";
import { Present } from "@/modules/models/present";
import {
  REALTIME_CHANNEL_STATES,
  RealtimeChannel,
} from "@supabase/supabase-js";

export type PresenceState = {
  user?: User;
  present?: Present;
  isReady?: boolean;
};

export class RoomFetcher {
  realtimeClient = supabaseClient;
  channel: RealtimeChannel | null = null;
  onSyncState?: (payload: PresenceState[]) => void;

  localState: PresenceState | null = null;

  private setLocalState(state: Partial<PresenceState>) {
    this.localState = {
      ...this.localState,
      ...state,
    };
  }

  private async syncPresenceState(state: PresenceState) {
    if (!this.channel) return;
    await this.channel.track(state);
  }

  async joinRoom(roomId: string, user: User) {
    const channel = this.realtimeClient.channel(`room:${roomId}`, {
      config: {
        presence: {
          key: roomId,
        },
      },
    });
    if (channel.state === REALTIME_CHANNEL_STATES.joined) return;
    this.channel = channel;
    this.setLocalState({ user, isReady: false });
    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED" || !this.localState) {
        return null;
      }
      this.syncPresenceState(this.localState);
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState<PresenceState>();
        this.onSyncState?.(newState[roomId]);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {})
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {});
  }

  async postPresent(present: Present) {
    if (!this.channel || !this.localState) return;
    this.setLocalState({ present });
    await this.channel.track(this.localState);
  }

  async updateReadyState(isReady: boolean) {
    if (!this.channel || !this.localState) return;
    this.setLocalState({ isReady });
    await this.channel.track(this.localState);
  }

  setOnSyncState(cb: (payload: any) => void) {
    this.onSyncState = cb;
  }
}
