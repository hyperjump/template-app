<script setup lang="ts">
import { cn } from "@/lib/utils"
import {
  CalendarHeading,
  type CalendarHeadingProps,
  useForwardProps,
} from "radix-vue"
import { computed, type HTMLAttributes } from "vue"

const props = defineProps<
  CalendarHeadingProps & { class?: HTMLAttributes["class"] }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    :class="cn('text-xs font-medium', props.class)"
    v-bind="forwardedProps"
  >
    <slot :heading-value>
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>
