import { SubscribeToRoomDocument } from "@/queries";
import { useSubscription } from "@vue/apollo-composable";

export default function setup(): void {
  useSubscription(SubscribeToRoomDocument);
}
