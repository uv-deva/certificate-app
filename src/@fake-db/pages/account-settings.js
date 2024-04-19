import mock from "../mock";
import image from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import profileImage from "@src/assets/images/avatars/11-small.png";
import googleProfileImage from "@src/assets/images/avatars/3-small.png";

const data = {
  accountSetting: {
    general: {
      avatar: image,
      username: "johndoe",
      fullName: "John Doe",
      email: "granger007@hogward.com",
      company: "IBM Technology",
    },
    info: {
      bio: "",
      dob: null,
      country: "USA",
      website: "",
      phone: 6562542568,
    },
    social: {
      socialLinks: {
        twitter: "https://www.twitter.com",
        facebook: "",
        google: "",
        linkedIn: "https://www.linkedin.com",
        instagram: "",
        quora: "",
      },
      connections: {
        twitter: {
          profileImg: profileImage,
          id: "johndoe",
        },
        google: {
          profileImg: googleProfileImage,
          id: "luraweber",
        },
        facebook: {},
        github: {},
      },
    },
    notification: {
      commentOnArticle: true,
      answerOnForm: true,
      followMe: false,
      newAnnouncements: true,
      productUpdates: true,
      blogDigest: false,
    },
  },
};

mock.onGet("/account-setting/data").reply(() => [200, data.accountSetting]);
