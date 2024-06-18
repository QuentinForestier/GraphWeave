import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {HomePage} from "@/pages/Home.page";
import {ProjectPage} from "@/pages/Project.page";
import {useAuth} from "@/hooks/useAuth";
import {Editor} from "@/components/Editor/Editor";
import {AppProvider} from "@/contexts/AppContext";


type RoutesType = {
    toggle: () => void
}

const Routes = ({toggle}: RoutesType) => {
    const {token} = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "/",
            element: <HomePage toggle={toggle}/>,
        },
        {
            path: "/login",
            element: <HomePage toggle={toggle}/>,
        },
        {
            path: '/editor',
            element: <Editor />
        }
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute/>, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/projects/:id",
                    element: <AppProvider>
                        <ProjectPage/>
                    </AppProvider>,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly: never[] = [];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router}/>;
};

export default Routes;