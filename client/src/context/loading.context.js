import React, { createContext, useState } from 'react'

export const LoadingContext = createContext()

export const LoadingContextProvider = ({ children }) => {
    // const loadingState = {
    //     loadingCount: 0,
    //     showLoading,
    //     hideLoading
    //   }

    const [isLoading, setIsLoading] = useState({})
    
    const showLoading = () => {
        setIsLoading(prevState => {
          return {
            ...prevState,
            loadingCount: prevState.loadingCount + 1
          }
        })
      }

      const hideLoading = () => {
        setIsLoading(prevState => {
          return {
            ...prevState,
            loadingCount: prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0
          }
        })
      }


    

    return (
        <LoadingContextProvider value={{isLoading}}>
            {children}
        </LoadingContextProvider>
    )
}