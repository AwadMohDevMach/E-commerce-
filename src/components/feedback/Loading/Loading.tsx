import React from "react";
import { TLoading } from "@customTypes/shared"
import SkeletonCart from "./skeletons/SkeletonCart/SkeletonCart";
import SkeletonCategories from "./skeletons/SkeletonCategories/SkeletonCategories";
import SkeletonProducts from "./skeletons/SkeletonProducts/SkeletonProducts";
import LottieHandler from "../LottieHanler/LottieHanler";

const skeletonsTypes = {
    category: SkeletonCart,
    product: SkeletonCategories,
    cart: SkeletonProducts,
    // table: TableSkeleton,
  };
  
  type LoadingProps = {
    loading: TLoading;
    error: null | string;
    children: React.ReactNode;
    type?: keyof typeof skeletonsTypes;
  };
  
  const Loading = ({
    loading,
    error,
    children,
    type = "category",
  }: LoadingProps) => {
    const Component = skeletonsTypes[type];
  
    if (loading === "pending") {
      return <Component />;
    }
    if (loading === "failed") {
      return (
        <div>
          <LottieHandler type="error" message={error as string} />
        </div>
      );
    }
    return <div>{children}</div>;
  };
  
  export default Loading;