import Channels from "@/components/Channels.vue";
import Map from "@/components/Map.vue";
import BulletinBoards from "@/components/BulletinBoards.vue";
import channels from "@/subscribers/channels";
import rooms from "@/subscribers/rooms";

export default {
  components: {
    Channels,
    Map,
    BulletinBoards,
  },
  subscribers: [channels, rooms],
};
