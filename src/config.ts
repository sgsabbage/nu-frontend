import Channels from "@/components/Channels.vue";
import Character from "@/components/Character.vue";
import Map from "@/components/Map.vue";
import BulletinBoards from "@/components/BulletinBoards.vue";
import channels from "@/subscribers/channels";

export default {
  components: {
    Channels,
    Map,
    BulletinBoards,
    Character,
  },
  subscribers: [channels],
};
