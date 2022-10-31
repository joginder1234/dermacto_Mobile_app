import { createContext, useReducer, useState } from "react";

export const DataContext = createContext({
  /** User profile Handler */
  userProfile: {},
  addUserProfile: (userData) => {},

  /** Products Handler */
  productsList: [],
  setProductsValue: (products) => {},

  /* Add Topicals context */
  tropicals: [],
  addProduct: (value) => {},
  removeProduct: (value) => {},

  // selected product handler
  product: {},
  addProductEntry: (entry) => {},
  removeProductEntry: (entry) => {},

  //Days Of Week handdler
  Days: [],
  addDays: (day) => {},
  setEmptyDaysList: () => {},
  removeDay: (day) => {},

  // selected product category refinary
  selectedProductType: "",
  setProductTypeValue: (type) => {},

  //Add Product Manually Context
  ManualProduct: [],
  addManualProduct: ({ CompanyName, ProductName, ProductCategory }) => {},
  setManualProduct: (productData) => {},

  // Register with context
  RegisterData: {},
  addRegisterData: (data) => {},

  // getVerificationId
  verificationId: null,
  setverificationId: () => {},

  //routine Data context
  routineData: {},
  addRoutineData: (routineedata) => {},

  //get routine day context
  routineDay: "",
  setroutineDay: (day) => {},

  //Product sorting context
  SortType: "",
  setSortType: (type) => {},

  //Category context
  Category: [],
  addCategory: (categories) => {},

  //set Routine Graph context
  routineGraph: [],
  setRoutineGraph: (graphData) => {},

  //set Schedule context
  Scheduledata: [],
  setScheduleData: (schedule) => {},

  isLoading: false,
  setLoading: (status) => {},
});

function ManualProductReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...action.payload, ...state];
    case "SET":
      return action.payload;
    default:
      return state;
  }
}
function DataContextProvider({ children }) {
  const [userprofile, setuserProfile] = useState({});
  const [products, setProducts] = useState([]);
  const [addProductIds, setAddProductIds] = useState([]);
  const [selectedProduct, addNewEntry] = useState({});
  const [selectedDay, selectday] = useState([]);
  const [ManualProductState, dispatch] = useReducer(ManualProductReducer, []);
  const [selectedTreatment, setTreatmentType] = useState("");
  const [RegisterData, setRegisterData] = useState({});
  const [verificationId, setVerificationId] = useState(null);
  const [routinedataValue, setRoutineDataValue] = useState({});
  const [routineDayvalue, setRoutineDayValue] = useState("");
  const [sortTypevalue, setSortTypeValue] = useState("");
  const [categoryValue, setCategoryValue] = useState([]);
  const [graphValue, setGraphValue] = useState([]);
  const [scheduleValue, setScheduleValue] = useState([]);
  const [isloading, setloading] = useState(false);

  function addUserProfile(userData) {
    setuserProfile(userData);
  }

  function setProductsValue(products) {
    setProducts(products);
  }

  function addProduct(value) {
    setAddProductIds(value);
  }

  function removeProduct(id) {
    setAddProductIds((currentProductIds) =>
      currentProductIds.filter((productId) => productId !== id)
    );
  }

  // product functions
  function addProductEntry(value) {
    addNewEntry(value);
  }

  function addDays(day) {
    selectday((currentDay) => [...currentDay, day]);
  }

  function setEmptyDaysList() {
    selectday([]);
  }

  function removeDay(day) {
    selectday((currentDay) => currentDay.filter((dayId) => dayId !== day));
  }

  // Manual Product functions
  function addManualProduct(product) {
    dispatch({ type: "ADD", payload: product });
  }

  function setManualProduct(productData) {
    dispatch({ type: "SET", payload: productData });
  }

  function setProductTypeValue(value) {
    setTreatmentType(value);
  }

  //Register with data function
  function addRegisterData(data) {
    setRegisterData(data);
  }

  //get verification Id
  function setverificationId() {
    setVerificationId;
  }

  //routine data function
  function addRoutineData(routineedata) {
    setRoutineDataValue(routineedata);
  }

  //routineDayFunction
  function setroutineDay(day) {
    setRoutineDayValue(day);
  }

  //sort type function
  function setSortType(type) {
    setSortTypeValue(type);
  }

  //Category function
  function addCategory(categories) {
    setCategoryValue((currentValue) => [currentValue, categories]);
  }

  //set routine graph function
  function setRoutineGraph(graphData) {
    setGraphValue(graphData);
  }

  // set Schedule function
  function setScheduleData(schedule) {
    setScheduleValue(schedule);
  }

  function setLoading(status) {
    setloading(status);
  }

  const value = {
    userProfile: userprofile,
    addUserProfile: addUserProfile,
    productsList: products,
    setProductsValue: setProductsValue,
    tropicals: addProductIds,
    addProduct: addProduct,
    removeProduct: removeProduct,
    product: selectedProduct,
    addProductEntry: addProductEntry,
    Days: selectedDay,
    addDays: addDays,
    setEmptyDaysList: setEmptyDaysList,
    removeDay: removeDay,
    //Manual Product Values
    ManualProduct: ManualProductState,
    addManualProduct: addManualProduct,
    setManualProduct: setManualProduct,
    selectedProductType: selectedTreatment,
    setProductTypeValue: setProductTypeValue,

    // Register with context
    RegisterData: RegisterData,
    addRegisterData: addRegisterData,

    //get verification id
    verificationId: verificationId,
    setverificationId: setverificationId,

    //routine data context
    routineData: routinedataValue,
    addRoutineData: addRoutineData,

    //get routine day function
    routineDay: routineDayvalue,
    setroutineDay: setroutineDay,

    //sort type context
    SortType: sortTypevalue,
    setSortType: setSortType,

    //set graph data context
    routineGraph: graphValue,
    setRoutineGraph: setRoutineGraph,

    // set Schedule context
    Scheduledata: scheduleValue,
    setScheduleData: setScheduleData,

    isLoading: isloading,
    setLoading: setLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
