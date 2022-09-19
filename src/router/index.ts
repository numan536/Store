import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
//const route = useRoute();
const routes: Array<RouteRecordRaw> = [
    // *** General ***
    {
      // path: "/:catchAll(.*)",
      path: "/:catchAll(.*)",
      name: "not-found",
      component: () =>
        import(/* webpackChunkName: "Not Fount" */ "../views/general/NotFound.vue")
    },
    // *** Dashboard ***
    {
      path: "/",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "Not Fount" */ "../views/dashboard/Dashboard.vue"),
        //component: Dashboard
    //   meta: {
    //     metaTags: [
    //       {
    //         name: 'description',
    //         content: 'The home page of our AdMotor.'
    //       }
    //     ]
    //   }
    },
    // *** Users ***
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "Login" */  /* webpackPrefetch: true */ "../views/user/Login.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The login page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/login/phone",
      name: "phone-login",
      component: () =>
        import(/* webpackChunkName: "PhoneLogin" */ /* webpackPrefetch: true */ "../views/user/PhoneLogin.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The phoneLogin page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "Profile" */ /* webpackPrefetch: true */ "../views/user/Profile.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The profile page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/other-profile/:user_id",
      name: "other-profile",
      component: () =>
        import(/* webpackChunkName: "OtherProfile" */ /* webpackPrefetch: true */ "../views/user/OtherProfile.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The otherProfile page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: () =>
        import(/* webpackChunkName: "EditProfile" */ /* webpackPrefetch: true */ "../views/user/EditProfile.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The editProfile page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "Register" */ /* webpackPrefetch: true */ "../views/user/Register.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The register page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: () =>
        import(/* webpackChunkName: "ForgotPassword" */ /* webpackPrefetch: true */ "../views/user/ForgotPassword.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The forgotPassword page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/followers",
      name: "followers",
      component: () =>
        import(/* webpackChunkName: "FollowerList" */ /* webpackPrefetch: true */ "../views/user/FollowerList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The followers page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/following",
      name: "following",
      component: () =>
        import(/* webpackChunkName: "FollowingList" */ /* webpackPrefetch: true */ "../views/user/FollowingList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The following page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/blocked-users",
      name: "blocked-users",
      component: () =>
        import(/* webpackChunkName: "BlockedUserList" */ /* webpackPrefetch: true */ "../views/user/BlockedUserList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The blockUser page of our AdMotor.'
          }
        ]
      }
    },
    {
        path: "/account-list",
        name: "account-list",
        component: () =>
          import(/* webpackChunkName: "NotificationList" */ /* webpackPrefetch: true */ "../views/user/AccountList.vue"),
        meta: {
          metaTags: [
            {
              name: 'description',
              content: 'The account page of our Buysell.'
            }
          ]
        }
      },
    {
      path: "/verify-code",
      name: "verify-code",
      component: () =>
        import(/* webpackChunkName: "VerifyCode" */ /* webpackPrefetch: true */ "../views/user/VerifyCode.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The verifyCode page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: () =>
        import(/* webpackChunkName: "VerifyEmail" */ /* webpackPrefetch: true */ "../views/user/VerifyEmail.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The verifyEmail page of our AdMotor.'
          }
        ]
      }
    },
    // *** Items ***
    {
      path: "/item-list/:manufacturer_name",
      name: "item-list",
      component: () =>
        import(/* webpackChunkName: "ItemList" */ /* webpackPrefetch: true */ "../views/item/list/ItemList.vue"),   
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The item page of our AdMotor.'
          }
        ]
      }     
    },
    {
      path: "/item-list",
      name: "item-list",
      component: () =>
        import(/* webpackChunkName: "Item" */ /* webpackPrefetch: true */ "../views/item/list/ItemList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The item page of our AdMotor.'
          }
        ]
      }        
    },
    {
      path: "/item/:itemName",
      name: "item",
      component: () =>
        import(/* webpackChunkName: "ItemDetail" */ /* webpackPrefetch: true */ "../views/item/detail/ItemDetail.vue"),
      meta: {
        reload: true,
        metaTags: [
          {
            name: 'description',
          }
        ]
      }
    },
    {
      path: "/item-entry",
      name: "item-entry",
      component: () =>
        import(/* webpackChunkName: "ItemEntry" */ /* webpackPrefetch: true */ "../views/item/entry/ItemEntry.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The itemEntry page of our AdMotor.'
          }
        ]
      }       
    },
    {
      path: "/favourite",
      name: "favourite",
      component: () =>
        import(/* webpackChunkName: "FavouriteList" */ /* webpackPrefetch: true */ "../views/item/favourite/FavouriteList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The favourite page of our AdMotor.'
          }
        ]
      } 
    },
    {
      path: "/reported-items",
      name: "reported-items",
      component: () =>
        import(/* webpackChunkName: "ReportedItemList" */ /* webpackPrefetch: true */ "../views/item/reported/ReportedItemList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The reportItem page of our AdMotor.'
          }
        ]
      } 
    },
    {
      path: "/paid-items",
      name: "paid-items",
      component: () =>
        import(/* webpackChunkName: "PaidItemList" */ /* webpackPrefetch: true */ "../views/item/list/PaidItemList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The paidItem page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/active-items",
      name: "active-items",
      component: () =>
        import(/* webpackChunkName: "ActiveItemList" */ /* webpackPrefetch: true */ "../views/item/list/ActiveItemList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The activeItem page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/follower-items",
      name: "follower-items",
      component: () =>
        import(/* webpackChunkName: "FollowerItemList" */ /* webpackPrefetch: true */ "../views/item/list/FollowerItemList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The followerItem page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/pending-items",
      name: "pending-items",
      component: () =>
        import(/* webpackChunkName: "PendingItemList" */ /* webpackPrefetch: true */ "../views/item/list/PendingItemList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The pendingItem page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/reject-items",
      name: "reject-items",
      component: () =>
        import(/* webpackChunkName: "RejectItemList" */ /* webpackPrefetch: true */ "../views/item/list/RejectItemList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The rejectItem page of our AdMotor.'
          }
        ]
      }
    },
    // *** UI ***
    {
      path: "/ui-collection",
      name: "ui-collection",
      component: () =>
        import(/* webpackChunkName: "UiCollection" */ /* webpackPrefetch: true */ "../views/general/UiCollection.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The ui-collection page of our AdMotor.'
          }
        ]
      }
    },
    // *** Chat ***
    {
      path: "/chat",
      name: "chat",
      component: () =>
        import(/* webpackChunkName: "Chat" */ /* webpackPrefetch: true */ "../views/chat/Chat.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The chat page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/chat-list",
      name: "chat-list",
      component: () =>
        import(/* webpackChunkName: "ChatList" */ /* webpackPrefetch: true */ "../views/chat/list/ChatList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The chatlist page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/offer-list",
      name: "offer-list",
      component: () =>
        import(/* webpackChunkName: "OfferList" */ /* webpackPrefetch: true */ "../views/chat/list/OfferList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The offerList page of our AdMotor.'
          }
        ]
      }
    },
    // *** Contact Us ***
    {
      path: "/contact",
      name: "contact",
      component: () =>
        import(/* webpackChunkName: "Contact" */ /* webpackPrefetch: true */ "../views/contact/ContactUs.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The contactUs page of our AdMotor.'
          }
        ]
      }
    },
    // *** About Us ***
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "About" */ /* webpackPrefetch: true */ "../views/about/About.vue"),
      meta: {
        title: 'About Page - AdMotor App',
        metaTags: [
          {
            name: 'description',
            content: 'The about page of our AdMotor.'
          }
        ]
      },
    },
    // *** Privacy ***
    {
      path: "/privacy",
      name: "privacy",
      component: () =>
        import(/* webpackChunkName: "Privacy" */ /* webpackPrefetch: true */ "../views/privacy/Privacy.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The privacy page of our AdMotor.'
          }
        ]
      }
    },
    // *** TermsAndConditions ***
    {
        path: "/terms-and-conditions",
        name: "terms-and-conditions",
        component: () =>
          import(/* webpackChunkName: "Terms and Condition" */ /* webpackPrefetch: true */ "../views/about/TermsAndConditions.vue"),
        
      },
    // *** FAQ ***
    {
      path: "/faq",
      name: "faq",
      component: () =>
        import(/* webpackChunkName: "FAQ" */ /* webpackPrefetch: true */ "../views/about/FaqPage.vue"),
     
    },
    // *** Safety ***
    {
      path: "/safety",
      name: "safety",
      component: () =>
        import(/* webpackChunkName: "Safety" */ /* webpackPrefetch: true */ "../views/safety/Safety.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The safety page of our AdMotor.'
          }
        ]
      }
    },
    // *** Blog ***
    {
      path: "/blog",
      name: "blog-list",
      component: () =>
        import(/* webpackChunkName: "BlogList" */ /* webpackPrefetch: true */ "../views/blog/list/BlogList.vue"),    
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The blog page of our AdMotor.'
          }
        ]
      }    
    },
    // *** Buy Ad Transaction History ***
    {
        path: "/limit-ads",
        name: "limit-ads",
        component: () =>
          import(/* webpackChunkName: "BuyAdTransaction" */ /* webpackPrefetch: true */ "../views/transaction/BuyAdTransaction.vue"),    
        meta: {
          metaTags: [
            {
              name: 'description',
              content: 'The blog page of our Buysell.'  
            }  
          ] 
        }     
      },  
      {  
        path: "/limit",  
        name: "limit",  
        component: () =>
          import(/* webpackChunkName: "BuyAdTransaction" */ /* webpackPrefetch: true */ "../views/transaction/BuyAdTransaction.vue"),    
        meta: {
          metaTags: [
            {
              name: 'description',
              content: 'The blog page of our Buysell.'
            }
          ]
        }      
      },
    {
      path: "/manufacturer",
      name: "manufacturer-list",
      component: () =>
        import(/* webpackChunkName: "ManufacturerList" */ /* webpackPrefetch: true */ "../views/manufacturer/list/ManufacturerList.vue"),   
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The manufacturer page of our AdMotor.'
          }
        ]
      }     
    },
    {
      path: "/manufacturer/:manufacturer_id/:manufacturer_name",
      name: "model-list",
      component: () =>
        import(/* webpackChunkName: "ModelList" */ /* webpackPrefetch: true */ "../views/model/list/ModelList.vue"),  
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The Model page of our AdMotor.'
          }
        ]
      }      
    },
    {
      path: "/blog/:blog_id",
      name: "blog-detail",
      component: () =>
        import(/* webpackChunkName: "BlogDetail" */ /* webpackPrefetch: true */ "../views/blog/detail/BlogDetail.vue"), 
      meta: {
        metaTags: [
          {
            name: 'description',
          }
        ]
      }       
    },
    // *** Notification ***
    {
      path: "/notification/:notification_id",
      name: "notification",
      component: () =>
        import(/* webpackChunkName: "Notification" */ /* webpackPrefetch: true */ "../views/notification/Notification.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The notificationDetail page of our AdMotor.'
          }
        ]
      }
    },
    {
      path: "/notification",
      name: "notification-list",
      component: () =>
        import(/* webpackChunkName: "NotificationList" */ /* webpackPrefetch: true */ "../views/notification/NotificationList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The notification page of our AdMotor.'
          }
        ]
      }
    },

    // *** Credit Card Entry ***
    // {
    //     path: "/card-entry",
    //     name: "card-entry",
    //     component: () =>
    //         import(/* webpackChunkName: "Card Entry" */ "../views/card/CreditCardView.vue")
    // },
    // *** Review ***
    {
      path: "/review-list",
      name: "review-list",
      component: () =>
        import(/* webpackChunkName: "Review" */ /* webpackPrefetch: true */ "../views/review/ReviewList.vue"),
      meta: {
        metaTags: [
          {
            name: 'description',
            content: 'The review page of our AdMotor.'
          }
        ]
      }
    },

];

const router = createRouter({

    history: createWebHistory(process.env.BASE_URL),
    // history: createMemoryHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        
        to.meta.metaTags.fromHistory = savedPosition !== null;
        if(savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 };

    }
    
})

// This callback runs before every route change, including on page load.
// router.beforeEach((to, from, next) => {
//   let setitemName = '';
//   let setblogName = '';
//   if (to.query.item_name) {
//     setitemName = to.query.item_name.toString() || "ro";
//   }
//   if (to.params.blogName) {
//     setblogName = to.params.blogName.toString() || "ro";
//   }
  
  // Find the nearest route element with meta tags.
//   const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // Remove any stale meta tags from the document using the key attribute we set below.
//   Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode?.removeChild(el));

  // Skip rendering meta tags if there are none.
//   if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
//   nearestWithMeta.meta.metaTags.map(tagDef => {
    // const tag = document.createElement('meta');

    // Object.keys(tagDef).forEach(key => {
    //   tag.setAttribute(key, tagDef[key]);
    // });
    // if (setitemName) {
    //   tag.setAttribute('name', setitemName);
    // }
    // if (setblogName) {
    //   tag.setAttribute('content',setblogName);
    // }
    
    // We use this to track which meta tags we create so we don't interfere with other ones.
    // tag.setAttribute('data-vue-router-controlled', '');

//     return tag;
//   })
  // Add the meta tags to the document head.
//   .forEach(tag => document.head.appendChild(tag));

//   next();
// });

// ...

export default router;