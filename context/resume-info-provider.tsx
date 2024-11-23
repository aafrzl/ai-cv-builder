"use client";

import useGetDocumentById from "@/features/document/use-get-document-by-id";
import { ResumeDataType } from "@/types/resume.type";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type ResumeContextType = {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  onUpdate: (data: ResumeDataType) => void;
};

export const ResumeInfoContext = createContext<ResumeContextType | undefined>(
  undefined
);

export const ResumeInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const param = useParams();
  const documentId = param.documentId as string;

  const { data, isLoading, isSuccess, isError, refetch } =
    useGetDocumentById(documentId);

  const [resumeInfo, setResumeInfo] = useState<ResumeDataType>();

  useEffect(() => {
    if (isSuccess) setResumeInfo(data?.data);
  }, [isSuccess]);

  const onUpdate = (data: ResumeDataType) => {
    setResumeInfo(data);
  };

  return (
    <ResumeInfoContext.Provider
      value={{
        resumeInfo,
        onUpdate,
        isError,
        isLoading,
        isSuccess,
        refetch,
      }}
    >
      {children}
    </ResumeInfoContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a ResumeInfoProvider");
  }

  return context;
};
