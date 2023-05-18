import axios from "../../customizeAxios/axios"


const getProjectWithPagination = (page, limit, createBy) => {
    return axios.get(`/api/v4/getProject?page=${page}&limit=${limit}&createBy=${createBy}`)
}

const fetchProjectByid = (id) => {
    return axios.get(`/api/v4/getProjects/${id}`)
}
const CreateProject = (data) => {
    return axios.post(`/api/v4/add-project-to-user`, { ...data })
}
const getSaleChannel = () => {
    return axios.get("/api/v4/getSaleChannel")
}
const getStastusPayment = () => {
    return axios.get("/api/v4/getStastusPayment")
}
const updateProject = (data) => {
    return axios.put("/api/v4/project/update", { ...data })
}
const deleteProject = (ProductId) => {
    return axios.delete("/api/v4/delete/Project ", { data: { id: ProductId } })
}
const createChatProject = (data) => {
    return axios.post("/api/v4/add-chat-to-Project", { ...data })
}
const updateProjectChat = (data) => {
    return axios.put("/api/v4/project/update/chat", { ...data })
}

const deleteChatProject = (id) => {
    return axios.delete("/api/v4/Project/delete/chat ", { data: { id: id } })
}
const getDataSearch = (data) => {
    return axios.get(`/api/v4/Project/search?data=${data}`)
}

const getDataWithTime = (StartDateCalendar, endDateCalendar) => {
    return axios.get(`/api/v4/Project/search/ByTime?StartDateCalendar=${StartDateCalendar}&endDateCalendar=${endDateCalendar}`)
}


const getProjectStatusPaymentWithPagination = (currentPageOne, currentLimitOne) => {
    return axios.get(`/api/v4/getProject/statusPayment?currentPageOne=${currentPageOne}&currentLimitOne=${currentLimitOne}`)
}

const getProjectWithPaginationStatusPayment = (page, limit, createBy, statuspaymentId) => {
    return axios.get(`/api/v4/getProject/status/payment?page=${page}&limit=${limit}&createBy=${createBy}&statuspaymentId=${statuspaymentId}`)
}
const getProjectWithPaginationStatusDelivery = (page, limit, createBy, statusdeliveryId) => {
    return axios.get(`/api/v4/getProject/status/Delivery?page=${page}&limit=${limit}&createBy=${createBy}&statusdeliveryId=${statusdeliveryId}`)
}
const getNameProduct = () => {
    return axios.get('/api/v4/get/nameProduct')
}

const assignProfectIdAndUserId = (projectId, userId) => {
    return axios.post("/api/v4/assign-to-Project-user", { projectId, userId })
}

const getListWarehouseWithPaginationStatusPayment = (page, limit, createdBy) => {
    return axios.get(`/api/v4/getproduct/warehouse?page=${page}&limit=${limit}&createdBy=${createdBy}`)
}

const createWarehouse = (data) => {
    return axios.post("/api/v4/create/warehouse", { ...data })
}
const updateWarehouse = (data) => {
    return axios.put("/api/v4/update/warehouse", { ...data })
}
const getNumberProductinWarehouse = (id) => {
    return axios.get(`/api/v4/getNumber/warehouse?id=${id}`)
}
const updateNumberProductInWarehouse = (id, number) => {
    return axios.put("api/v4/update/Number/warehouse", { id, number })
}
const getDataSearchInWarehouse = (data) => {
    return axios.get(`/api/v4/Project/search/warehouse?data=${data}`)
}
const getAllNumberSatusProductInWarehouse = (created_By) => {
    return axios.get(`/api/v4/Project/all/status-product?created_By=${created_By}`)
}

const getListWarehouseWithPaginationproductStatusId = (page, limit, created_By, productStatusId) => {
    return axios.get(`/api/v4/getProduct/bystatus_product/warehouse?page=${page}&limit=${limit}&created_By=${created_By}&productStatusId=${productStatusId}`)
}
const getWarehouseForDashboard = (created_By) => {
    return axios.get(`/api/v4/getWarehouseDashboard?created_By=${created_By}`)
}

const getAllNumberMoneyInWarehouse = (created_By) => {
    return axios.get(`/api/v4/getWarehouseDashboardWithMoney?created_By=${created_By}`)
}
const getDataWithTimeInWarehouse = (created_By, StartDateCalendar, endDateCalendar) => {
    return axios.get(`/api/v4/getWarehouseDashboardWithTime?created_By=${created_By}&StartDateCalendar=${StartDateCalendar}&endDateCalendar=${endDateCalendar}`)
}
const getDataDashboardProduct = (created_By) => {
    return axios.get(`/api/v4/getDataForProductDashboard?createdBy=${created_By}`)
}
const getDataDashboardProductWithAge = (created_By) => {
    return axios.get(`api/v4/getDataForProductDashboardByAge?createdBy=${created_By}`)
}
const getDataDashboardProductWithTimeInWarehouse = (created_By, StartDateCalendar, endDateCalendar) => {
    return axios.get(`/api/v4/getProductDashboarWithTime?created_By=${created_By}&StartDateCalendar=${StartDateCalendar}&endDateCalendar=${endDateCalendar}`)
}
const getDataDashboardProductWithMounth = (created_By) => {
    return axios.get(`api/v4/getProductDashboarWithMounth?created_By=${created_By}`)
}
const getDataDashboardProductWithUser = (created_By) => {
    return axios.get(`/api/v4/getProductDashboarWithCustomer?created_By=${created_By}`)
}
export {
    getProjectWithPagination, fetchProjectByid, CreateProject, getSaleChannel, getStastusPayment,
    updateProject, deleteProject, createChatProject, updateProjectChat, deleteChatProject, getDataSearch,
    getDataWithTime, getProjectStatusPaymentWithPagination, getProjectWithPaginationStatusPayment,
    getProjectWithPaginationStatusDelivery, getNameProduct, getNumberProductinWarehouse, assignProfectIdAndUserId,
    getListWarehouseWithPaginationStatusPayment, createWarehouse, updateWarehouse, updateNumberProductInWarehouse,
    getDataSearchInWarehouse, getAllNumberSatusProductInWarehouse, getListWarehouseWithPaginationproductStatusId,
    getWarehouseForDashboard, getAllNumberMoneyInWarehouse, getDataWithTimeInWarehouse, getDataDashboardProduct,
    getDataDashboardProductWithAge, getDataDashboardProductWithTimeInWarehouse, getDataDashboardProductWithMounth,
    getDataDashboardProductWithUser
}