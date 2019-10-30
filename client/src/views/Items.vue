<template>
  <div class="items">
    <Item v-for="(item,index) in items" v-bind="item" :key="index" />
  </div>
</template>

<script>
import items from "@/assets/items.json";
import Item from "@/components/Item.vue";

export default {
  components: {
    Item
  },
  data() {
    return {
      items
    };
  }
};
</script>

<style lang="scss">
.items {
  margin-top: 36px;
}
</style>
