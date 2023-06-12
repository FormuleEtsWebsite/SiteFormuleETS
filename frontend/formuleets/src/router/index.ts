import { RouterOptions, createRouter, createWebHistory } from "vue-router";

import meta from "./meta";
import basicMeta, { Meta } from "./basicMeta";

import Contact from "../views/Contact/ContactPage.vue";
import Donate from "../views/Donate/DonatePage.vue";
import EASTEREGG from "../views/Easter-EGG/EastereggPage.vue";
import Error404 from "../views/Error404/Error404Page.vue";
import Home from "../views/Home/HomePage.vue";
import Project from "../views/Project/ProjectPage.vue";
import Sponsors from "../views/Sponsors/SponsorsPage.vue";
import Team from "../views/Team/TeamPage.vue";
import Videos from "../views/Videos/VideosPage.vue";
import AlbumView from "../views/Photos/AlbumView.vue";
import PhotosView from "../views/Photos/PhotosView.vue";

type SuperRoute = RouterOptions["routes"][number] & {
  pageName: string;
  meta?: { metaTags?: Meta[]; title?: string };
};
const routes: SuperRoute[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    pageName: "Home",
  },
  {
    path: "/team",
    name: "Team",
    component: Team,
    pageName: "Team",
  },
  {
    path: "/team/:year",
    name: "TeamYear",
    component: Team,
    props: true,
    pageName: "Team",
  },
  {
    path: "/sponsors",
    name: "Sponsors",
    component: Sponsors,
    pageName: "Sponsors",
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
    pageName: "Project",
  },
  {
    path: "/donate",
    name: "Donate",
    component: Donate,
    pageName: "Donate",
  },
  {
    path: "/contact-us",
    name: "Contact",
    component: Contact,
    pageName: "Contact US",
  },
  {
    path: "/media/videos",
    name: "Videos",
    component: Videos,
    pageName: "Videos",
  },
  {
    path: "/media/photos",
    name: "Albums",
    component: AlbumView,
    pageName: "Albums",
  },
  {
    path: "/photos/:id",
    name: "PhotosView",
    props: true,
    component: PhotosView,
    pageName: "Photos",
  },

  //EASTER EGG ;)
  {
    path: "/easter-eggs",
    name: "EASTEREGG",
    component: EASTEREGG,
    pageName: "EASTER EGGS",
  },

  //For 404 error, always need to be at the end
  {
    path: "/:pathMatch(.*)*",
    name: "Error404",
    component: Error404,
    pageName: "Not found",
  },
];

//setup meta
routes.forEach((route) => {
  const title = route.pageName + " — FormuleETS Montréal";

  route.meta = {};
  route.meta.title = title;
  route.meta.metaTags = basicMeta;
  route.meta.metaTags = route.meta.metaTags.concat([
    {
      name: "title",
      content: title,
    },
    {
      name: "description",
      content:
        route.path === "/"
          ? `Formule ETS is a team of engineering students from the École de technologie supérieure in Montreal. The team has been designing and building racing cars with the aim of participating in Formula SAE competitions for a little over 30 years now with the same goal: WIN !`
          : `Welcome to the ${route.pageName.toLowerCase()} page of the FormuleETS club.`,
    },
  ]);
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//go back to top when you change page
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);

  //setup SEO
  meta(to, from, next);
});

export default router;
export { SuperRoute };