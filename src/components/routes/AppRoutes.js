
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "../Login/login"
import Register from "../Register/Register"
import Home from '../home/home';
import PrivateRoutes from "./PrivateRouter";
import Users from "../ListUser/listUser"
import Products from "../products/products"
import About from "../About/About"
import Role from "../Role/Role"
import GroupRole from "../GroupRole/groupRole"
import { ProSidebarProvider } from 'react-pro-sidebar';
import NavHeader from '../navigation/nav';
import DetailProduct from "../products/detailProduct"
import NotFound from "./NotFound"
import ProductsWithStatuspayment from "../products/ProductsWithStatuspayment"
import ProductsWithStatusdeliveryNull from "../products/ProductsWithStatusdeliveryNull"
import ProductsWithStatusdeliveryOne from "../products/ProductsWithStatusdeliveryOne"
import ProductsWithStatusdeliveryTwo from "../products/ProductsWithStatusdeliveryTwo"
import Manageproducts from "../products staff/manageproducts"
import UserGroupCustomer from "../ListUser/listUserGroup4"
import UserGroupBoss from "../ListUser/listUserGroup1"
import UserGroupDev from "../ListUser/listUserGroup2"
import UserGroupStaff from "../ListUser/listUserGroup3"
import Warehouse from "../warehouse/warehouse"
import Warehouse_status_productId4 from "../warehouse/warehouse_status_productId4"
import Warehouse_status_productId3 from "../warehouse/warehouse_status_productId3"
import Warehouse_status_productId2 from "../warehouse/warehouse_status_productId2"
import Warehouse_status_productId1 from "../warehouse/warehouse_status_productId1"
import DashboardWarehouse from "../warehouse/dashboardWarehouse"
import DashboardProduct from "../products/dashboardProduct"
import Pickup from "../products staff/PickUp"
import Warehouse_staff from "../products staff/Warehouse_staff"
import Delivery_staff from "../products staff/Delivery_staff"
import Overview from "../products staff/overview"

const AppRoutes = (props) => {

    return (
        <>

            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>

                <PrivateRoutes path="/listuser" component={Users}
                />
                <PrivateRoutes path="/listuserbygroupCustomer" component={UserGroupCustomer}
                />
                <PrivateRoutes path="/listuserbygroupBoss" component={UserGroupBoss}
                />
                <PrivateRoutes path="/listuserbygroupDev" component={UserGroupDev}
                />
                <PrivateRoutes path="/listuserbygroupStaff" component={UserGroupStaff}
                />
                  <PrivateRoutes path="/Overview" component={Overview}
                />
                 <PrivateRoutes path="/Delivery_staff" component={Delivery_staff}
                />
                <PrivateRoutes path="/Warehouse_staff" component={Warehouse_staff}
                />
                <PrivateRoutes path="/Pickup_staff" component={Pickup}
                />
                <PrivateRoutes path="/Products" component={Products}
                />
                <PrivateRoutes path="/dashboard_Warehouse" component={DashboardWarehouse}
                />
                <PrivateRoutes path="/dashboard_Product" component={DashboardProduct}
                />
                <PrivateRoutes path="/Warehouse" component={Warehouse}
                />
                <PrivateRoutes path="/Warehouse_status_productId4" component={Warehouse_status_productId4}
                />
                <PrivateRoutes path="/Warehouse_status_productId3" component={Warehouse_status_productId3}
                />
                <PrivateRoutes path="/Warehouse_status_productId2" component={Warehouse_status_productId2}
                />
                <PrivateRoutes path="/Warehouse_status_productId1" component={Warehouse_status_productId1}
                />
                <PrivateRoutes path="/ProductsWithStatuspayment" component={ProductsWithStatuspayment}
                />
                <PrivateRoutes path="/ProductsWithStatusdeliveryNull" component={ProductsWithStatusdeliveryNull}
                />
                <PrivateRoutes path="/ProductsWithStatusdeliveryOne" component={ProductsWithStatusdeliveryOne}
                />
                <PrivateRoutes path="/ProductsWithStatusdeliveryTwo" component={ProductsWithStatusdeliveryTwo}
                />
                <PrivateRoutes path="/order-processing" component={Manageproducts}
                />
                <PrivateRoutes path="/about" component={About}
                />
                <PrivateRoutes path="/role" component={Role}
                />
                <PrivateRoutes path="/grouprole" component={GroupRole}
                />
                <PrivateRoutes path="/detailProduct/:id" component={DetailProduct}
                />
                <Route path="*" component={NotFound} />
            </Switch>

        </>
    )
}

export default AppRoutes