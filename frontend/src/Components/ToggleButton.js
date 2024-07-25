import React from 'react'

function ToggleButton() {
    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        console.log("theme clicked"); // Log when the theme button is clicked
        if (document.body.classList.contains('light')) {
            document.body.classList.remove('light'); // Remove 'light' class if present
            document.body.classList.add('dark'); // Add 'dark' class
        } else {
            document.body.classList.remove('dark'); // Remove 'dark' class if present
            document.body.classList.add('light'); // Add 'light' class
        }
    }

    return (
        <div>
            <div className="mx-1 sm:mx-2 flex justify-center items-center ">
                {/* Button to toggle the theme */}
                <button onClick={toggleTheme}
                    className="sm:h-10 h-8 sm:w-10 w-8 rounded-lg p-1 bg-gray-100 dark:bg-gray-700">
                    {/* Sun icon (light theme) */}
                    <svg className="fill-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    {/* Moon icon (dark theme) */}
                    <svg className="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ToggleButton
