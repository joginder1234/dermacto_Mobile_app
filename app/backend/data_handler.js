import { httpRequest, sendMultipart } from "./http_handler";
import api_handlers, {
  checkBoxFunctionAPI,
  getRoutineAPI,
  postRoutineAPI,
} from "./api_handlers";
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
        gender: response.user.gender,
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

export async function getGraphDataFunction(duration, type, context) {
  let token = await AsyncStorage.getItem("authToken");
  try {
    let graph = [];
    let response = await httpRequest(
      "GET",
      api_handlers.getGraphDetailAPI + `?setdate=${duration}&type=${type}`,
      {},
      token
    );
    for (const dayGraph of response.routine) {
      let data = {
        day: dayGraph.createdAt,
        value: dayGraph.count,
      };
      graph.push(data);
    }
    console.log(JSON.stringify(graph));
    context.setRoutineGraph(graph);
  } catch (error) {
    alert("Something Went Wrong");
  }
}

export async function uploadFileFunction(data) {
  let token = await AsyncStorage.getItem("authToken");
  console.log(data);
  try {
    await sendMultipart(api_handlers.uploadFileAPI, data, token);
  } catch (error) {
    console.log(error);
    alert("Unable to upload your image.");
  }
}

export async function uploadScheduleFunction(data, AppData) {
  let token = await AsyncStorage.getItem("authToken");
  try {
    await httpRequest("POST", api_handlers.uploadScheduleAPI, data, token).then(
      async (value) => {
        await getScheduleFunction(AppData);
      }
    );
  } catch (error) {
    console.log(`schedule post errror ::  ${error}`);
    alert("Something Went Wrong");
  }
}

export async function getScheduleFunction(AppData) {
  let token = await AsyncStorage.getItem("authToken");
  try {
    await httpRequest("GET", api_handlers.getScheduleAPI, {}, token).then(
      (response) => {
        if (response.schedule !== []) {
          let finalList = [];
          for (const values of response.schedule) {
            let days = [];

            for (const day of values.SelectedDays) {
              let medicineSchedule = [];
              for (const selection of day.medicineTaken) {
                let pushData = {
                  time: selection.time,
                  active: selection.active,
                  id: selection._id,
                };
                medicineSchedule.push(pushData);
              }
              let data = {
                dayId: day._id,
                isSelected: day.selected,
                isMedicineTaken: medicineSchedule,
                day: day.day,
              };
              days.push(data);
            }
            let scheduleData = {
              productName: values.product.productName,
              productType: values.type,
              productImage: values.product.productImagePath,
              scheduleId: values._id,
              productId: values.productId,
              schedule: values.schedule,
              selectedDays: days,
              isEverday: days.every((v) => v.isSelected === true),
            };
            finalList.push(scheduleData);
          }
          AppData.setScheduleData(finalList);
        } else {
          AppData.setScheduleData([]);
        }
        console.log("This program is done");
      }
    );
  } catch (error) {
    console.log(error);
    alert("Something went wrong!");
  }
}

export async function removeScheduleFunction(scheduleId, AppData) {
  let token = await AsyncStorage.getItem("authToken");
  try {
    await httpRequest(
      "DELETE",
      api_handlers.deleteScheduleAPI + scheduleId,
      {},
      token
    ).then(async (v) => {
      v.success == true ? alert(v.message) : null;
      await getScheduleFunction(AppData);
    });
  } catch (error) {
    alert("Something Went Wrong");
  }
}

export async function markDoneFunction(data, scheduleId, AppData) {
  let token = await AsyncStorage.getItem("authToken");
  try {
    await httpRequest(
      "PUT",
      api_handlers.checkBoxFunctionAPI + scheduleId,
      data,
      token
    ).then(async (response) => {
      await getScheduleFunction(AppData);
      response.success == true ? alert(response.message) : null;
    });
  } catch (error) {
    alert("Something Went Wrong");
  }
}
