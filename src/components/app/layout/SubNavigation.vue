<template>
  <Breadcrumb class="z-20 px-2 pt-2">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <Button variant="ghost" as-child>
            <RouterLink to="/home" class="gap-2">
              <span class="truncate">Home</span>
            </RouterLink>
          </Button>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink as-child>
          <Button variant="ghost" as-child>
            <RouterLink to="/exit" class="gap-2">
              <div class="truncate">Exit</div>
            </RouterLink>
          </Button>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage as-child>
          <BreadcrumbLink as-child>
            <Button variant="ghost" as-child>
              <RouterLink to="/welcome" class="gap-2">
                <span class="truncate">Breadcrumb</span>
              </RouterLink>
            </Button>
          </BreadcrumbLink>
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
