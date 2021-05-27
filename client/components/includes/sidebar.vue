<template >
  <nav
    class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="scrollbar-inner">
      <!-- Brand -->
      <div class="sidenav-header align-items-center">
        <a class="navbar-brand" href="javascript:void(0)">
          <h1 class="navbar-brand-img">
            <span class="text-danger">Task</span>
          </h1>
        </a>
      </div>
      <div class="navbar-inner">
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">
          <!-- Nav items -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin">
                <i class="ni ni-tv-2 text-primary"></i>
                <span class="nav-link-text">dashboard</span>
              </nuxt-link>
            </li>

            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin/users">
                <i class="fa fa-users text-primary"></i>
                <span class="nav-link-text">users</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/admin/products">
                <i class="fas fa-sitemap text-primary"></i>
                <span class="nav-link-text">products</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
