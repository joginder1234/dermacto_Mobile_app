import { httpRequest } from "./http_handler";
import api_handlers, { getRoutineAPI, postRoutineAPI } from "./api_handlers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signupWithEmail = async (email) => {
  if (!email) {
    alert("please enter email address");
  } else {
    let response = await httpRequest("POST", api_handlers.sendEmailOtpAPI, {
      email: email,
    });
    return response;
  }
};

export const registerUser = async (data) => {
  let response = await httpRequest("POST", api_handlers.signupAPI, data);
  return response;
};

export const getUserProfile = async (email) => {
  if (!email) {
    alert("please enter email address");
  } else {
    let response = await httpRequest("POST", api_handlers.sendEmailOtpAPI, {
      email: email,
    });
    return response;
  }
};

export const getProducts = async (token, AppData) => {
  let response = await httpRequest(
    "GET",
    api_handlers.getProductAPI,
    {},
    token
  );
  if (response.product !== []) {
    let products = response.product;
    let productList = [];
    for (let i = 0; i < products.length; i++) {
      const pro = products[i];
      let product = {
        productId: pro._id,
        companyName: pro.companyName,
        isPublic: pro.isPublic,
        productForm: pro.productForm,
        productImage: pro.productImagePath,
        productName: pro.productName,
        productType: pro.productType,
        userId: pro.userId,
        createdAt: pro.createdAt,
      };
      productList.push(product);
    }
    AppData.setProductsValue(productList);
    return response.product;
  } else {
    return null;
  }
};

export const verifyEmailOtp = async (otp) => {
  await httpRequest("POST", api_handlers.verifyEmailOtpAPI, { otp: otp })
    .then((value) => {
      return value;
    })
    .catch((error) => {
      alert("Something Went Wrong");
    });
};

export async function storeProducts(Products) {
  let token = await AsyncStorage.getItem("authToken");
  let response = await httpRequest(
    "POST",
    api_handlers.postProductAPI,
    Products,
    token
  );

  return response;
}

export async function getUserbyPhone(phoneNumber) {
  let response = await httpRequest(
    "POST",
    "https://medicare-democrate.herokuapp.com/api/v1/phone/detail",
    {
      phone: phoneNumber,
    }
  );
  let { success, user, token } = response;
  if (JSON.stringify(response.user) === "{}") {
    return null;
  } else {
    if (response && response.token) {
      await AsyncStorage.setItem("authToken", response.token);
    }
    let user = response.user;
    return user;
  }
}

export async function postRoutineHandler(routineData) {
  let token = await AsyncStorage.getItem("authToken");
  let response = await httpRequest("POST", postRoutineAPI, routineData, token);
  return response;
}

export async function getRoutinefunction(database, day) {
  let token = await AsyncStorage.getItem("authToken");
  let response = await httpRequest("GET", getRoutineAPI + `/${day}`, {}, token);
  if (response.routine.length == 0) {
    let routineData = {
      routineId: 1,
      wellSleepLastNight: 1,
      sleepingHoursLastNight: 1,
      stressLevel: 1,
      ExerciseTimeToday: 1,
      workoutIntensity: 1,
      amountOfWaterToday: 1,
      bowelMovementsToday: 1,
      digestiveDiscomfort: 1,
      itchingIntensity: 1,
      psoriasisScaling: 1,
    };
    database.addRoutineData(routineData);
  } else {
    let resp = response.routine[0];
    let routineData = {
      routineId: resp._id,
      wellSleepLastNight: resp.wellSleepLastNight,
      sleepingHoursLastNight: resp.sleepingHoursLastNight,
      stressLevel: resp.stressLevel,
      ExerciseTimeToday: resp.ExerciseTimeToday,
      workoutIntensity: resp.workoutIntensity,
      amountOfWaterToday: resp.amountOfWaterToday,
      bowelMovementsToday: resp.bowelMovementsToday,
      digestiveDiscomfort: resp.digestiveDiscomfort,
      itchingIntensity: resp.itchingIntensity,
      psoriasisScaling: resp.psoriasisScaling,
    };
    database.addRoutineData(routineData);
  }
  return response;
}

export async function getmyDetailsfunction(userData, saveProfile) {
  let token = await AsyncStorage.getItem("authToken");
  let response = await httpRequest("GET", api_handlers.getmyDetails, {}, token);
  let user = saveProfile
    ? {
        userId: response.user._id,
        country: response.user.country,
        dateOfBirth: response.user.dateOfBirth,
        email: response.user.email,
        phone: response.user.phone,
        image: response.user.profileImage,
        skin: response.user.skinCondition,
        username: response.user.username,
        authToken: token,
      }
    : null;
  saveProfile ? userData.addUserProfile(user) : null;
  return response;
}

export async function updateUserProfileFunction(userData) {
  let token = await AsyncStorage.getItem("authToken");
  let response = await httpRequest(
    "PUT",
    api_handlers.updateUserProfileAPI,
    userData,
    token
  );
  return response;
}

export async function updateRoutinefunction(routineData, routineId) {
  let token = await AsyncStorage.getItem("authToken");
  let response = await httpRequest(
    "PUT",
    api_handlers.updateRoutineAPI + routineId,
    routineData,
    token
  );
  return response;
}
