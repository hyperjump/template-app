<script setup lang="ts">
import { isTauri } from "@/helpers/utilities"
import emitter from "@/modules/mitt"
import { leftSidebarVisibility, rightSidebarVisibility } from "@/modules/theme"
import type { UnlistenFn } from "@tauri-apps/api/event"
import { getCurrentWindow } from "@tauri-apps/api/window"

const tabs = ref(3)
const selectedTab = ref(1)

let unlisten: UnlistenFn | undefined

const isFullscreen = computedAsync(
  async () => await getCurrentWindow().isFullscreen(),
  false
)

onMounted(async () => {
  unlisten = await getCurrentWindow().onResized(async () => {
    isFullscreen.value = await getCurrentWindow().isFullscreen()
  })
})

onBeforeUnmount(() => {
  if (unlisten) {
    unlisten()
  }
})
</script>

<template>
  <div class="sticky top-0 z-10 flex flex-col">
    <div
      data-tauri-drag-region
      class="flex items-center justify-between gap-2 px-2 pt-2"
      :class="{ 'ml-16': !leftSidebarVisibility && isTauri && !isFullscreen }"
    >
      <TooltipProvider v-if="!leftSidebarVisibility">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              v-motion-fade
              variant="ghost"
              size="xs"
              @click="emitter.emit('Sidebar.Left.Toggle')"
            >
              <icon-lucide-panel-left />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Expand Sidebar </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <nav
        data-tauri-drag-region
        class="no-scrollbar flex grow overflow-auto overscroll-none"
      >
        <div
          class="relative flex items-center justify-between before:sticky before:left-0 before:z-10 before:-mx-1 before:h-full before:w-2 before:bg-gradient-to-r before:from-background after:sticky after:right-0 after:z-10 after:-mx-2 after:h-full after:w-2 after:bg-gradient-to-l after:from-background"
        >
          <span class="flex items-center gap-2">
            <TooltipProvider>
              <div
                v-for="tab in tabs"
                :key="tab"
                class="group relative"
                :class="tab === selectedTab ? 'sticky left-0 right-0 z-20' : ''"
              >
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button
                      :variant="tab === selectedTab ? 'default' : 'ghost'"
                      size="xs"
                      class="min-w-32 max-w-64 gap-2 pl-2.5 pr-8"
                      :class="{
                        'text-muted-foreground/50': tab !== selectedTab,
                      }"
                      @click="selectedTab = tab"
                    >
                      <icon-mingcute-three-circles-fill />
                      <span class="truncate">
                        Sample Tab > Content > Topic > #{{ tab }}
                      </span>
                      <Tooltip>
                        <TooltipTrigger as-child>
                          <Button
                            size="xs"
                            variant="ghost"
                            class="absolute right-2 z-10 hidden h-4 w-4 group-hover:flex"
                            @click="tabs--"
                          >
                            <icon-lucide-x />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent> Close Tab </TooltipContent>
                      </Tooltip>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent> Tab </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </span>
          <!-- <span class="sticky right-0 flex items-center bg-background">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button variant="ghost" size="xs">
                    <icon-lucide-plus />
                  </Button>
                </TooltipTrigger>
                <TooltipContent> New Tab </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span> -->
        </div>
      </nav>
      <div class="sticky right-0 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="xs" @click="tabs++">
                <icon-lucide-plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent> New Tab </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
    <div
      data-tauri-drag-region
      class="flex items-center justify-between gap-2 p-2"
    >
      <span class="flex items-center gap-2">
        <TasksNotifications />
      </span>
      <span class="flex items-center gap-2">
        <CommandK />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                v-motion-fade
                variant="ghost"
                size="xs"
                class="gap-2"
                @click="emitter.emit('Sidebar.Right.Toggle')"
              >
                <icon-mingcute-ai-fill v-if="rightSidebarVisibility" />
                <icon-mingcute-ai-line v-else />
              </Button>
            </TooltipTrigger>
            <TooltipContent> Chat with AI </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </div>
    <Separator />
  </div>
</template>
