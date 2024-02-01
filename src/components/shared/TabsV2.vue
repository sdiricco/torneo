<template>
  <TabView
    :pt="{
      panelcontainer: {
        class: 'p-0',
      },
    }"
    :activeIndex="activeIndex"
    @update:activeIndex="onUpateActiveIndex">
    <TabPanel v-for="tab in props.tabs" :key="tab.value" :disabled="tab.disabled">
      <template #header>
        <div class="flex gap-2 align-items">
          <div class="flex align-items-center pt-2">
            <i v-if="tab.icon" :class="tab.icon" class="pr-2"></i>
            <div>{{ tab.label }}</div>
          </div>
          <Badge v-if="tab.badge" :value="tab.badge.value" :severity="tab.badge.severity"></Badge>
        </div>
      </template>
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface Tab {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  badge?: {
    value: string;
    severity: string;
  };
}

interface Props {
  tabs: Tab[];
  activeTab?: Tab | undefined;
}

const emit = defineEmits<{
  (e: "update:activeTab", value: Tab): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  activeTab: undefined,
});

const activeIndex = computed(() => (props.activeTab && props.tabs.findIndex((t) => t.value === props.activeTab?.value)) || 0);

const onUpateActiveIndex = (index: number) => {
  emit("update:activeTab", props.tabs[index]);
};
</script>
