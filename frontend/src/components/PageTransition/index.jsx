import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
    const variants = {
        initial: { opacity: 0, x: 0, y: -30 },
        animate: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, x: 0, y: 30, transition: { duration: 0.4 } },
    };


    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;