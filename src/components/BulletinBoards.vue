<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Board name</th>
        <th>Description</th>
        <th>Topics</th>
        <th>Last post</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Announcements</td>
        <td>Game announcements and messages from staff</td>
        <td>5</td>
        <td>Tuesday 20th March 2027 by Ifrit in Some topic</td>
      </tr>
      <tr>
        <td>OOC chatter</td>
        <td>A place to talk OOCly about the game</td>
        <td>20</td>
        <td>Tuesday 20th March 2027 by Ifrit in Some topic</td>
      </tr>
      <tr>
        <td>Empty board</td>
        <td>Nothing here</td>
        <td>0</td>
        <td>Never</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CurrentCharacter } from "@/types";

export default defineComponent({
  name: "BaseWindow",
  props: {
    character: {
      type: Object as () => CurrentCharacter,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.table {
  --bs-table-hover-bg: var(--nu-dark-3);
  --bs-table-hover-color: white;
  border-color: var(--nu-dark-1);
  color: white;

  & > :not(:last-child) > :last-child > * {
    border-bottom-color: inherit;
  }
}
</style>
