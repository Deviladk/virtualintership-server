const Course = require('../models/Course');
const Internship = require('../models/Internship');

const seedCourses = async () => {
  const courses = [
    {
      title: "Python Programming",
      description: "Master Python from basics to advanced concepts with real-world projects",
      duration: "6 Weeks",
      originalPrice: 4999,
      discountedPrice: 2999,
      badge: "Bestseller",
      image: "🐍",
      category: "Programming"
    },
    {
      title: "Java Programming",
      description: "Learn Java for enterprise applications and Android development",
      duration: "8 Weeks",
      originalPrice: 5999,
      discountedPrice: 3499,
      badge: "Popular",
      image: "☕",
      category: "Programming"
    },
    {
      title: "Web Development",
      description: "Complete full-stack development with React, Node.js and MongoDB",
      duration: "8 Weeks",
      originalPrice: 6999,
      discountedPrice: 3999,
      badge: "Popular",
      image: "💻",
      category: "Web Development"
    },
    {
      title: "Advanced Python Programming",
      description: "Master Python with advanced concepts and real projects",
      duration: "6 Weeks",
      originalPrice: 4999,
      discountedPrice: 2999,
      badge: "Bestseller",
      image: "🐍",
      category: "Programming"
    },
    {
      title: "React & Node.js Full Course",
      description: "Complete full-stack development with modern frameworks",
      duration: "8 Weeks",
      originalPrice: 6999,
      discountedPrice: 3999,
      badge: "Popular",
      image: "💻",
      category: "Web Development"
    },
    {
      title: "Data Structures & Algorithms",
      description: "Ace your coding interviews with DSA mastery",
      duration: "10 Weeks",
      originalPrice: 5999,
      discountedPrice: 3499,
      badge: "Essential",
      image: "📊",
      category: "Programming"
    },
    {
      title: "UI/UX Design Masterclass",
      description: "Learn design principles and tools like Figma",
      duration: "6 Weeks",
      originalPrice: 4499,
      discountedPrice: 2499,
      badge: "Hot",
      image: "🎨",
      category: "Design"
    }
  ];

  try {
    // Clear existing courses
    await Course.deleteMany({});
    console.log('Existing courses cleared');

    // Insert new courses
    const createdCourses = await Course.insertMany(courses);
    console.log(`${createdCourses.length} courses created successfully`);
    return createdCourses;
  } catch (error) {
    console.error('Error seeding courses:', error);
    throw error;
  }
};

const seedInternships = async () => {
  const internships = [
    {
      title: "Web Development",
      description: "Frontend, Backend & Full Stack opportunities",
      duration: "8 Weeks",
      category: "Web Development",
      badge: "Popular",
      image: "🌐",
      positionsAvailable: 45,
      price: "Free"
    },
    {
      title: "Android Development",
      description: "Mobile app development with Kotlin & Java",
      duration: "10 Weeks",
      category: "Android Development",
      badge: "Hot",
      image: "📱",
      positionsAvailable: 32,
      price: "Free"
    },
    {
      title: "Data Science",
      description: "Machine Learning, AI & Data Analysis roles",
      duration: "12 Weeks",
      category: "Data Science",
      badge: "New",
      image: "📊",
      positionsAvailable: 28,
      price: "Free"
    },
    {
      title: "Java Programming",
      description: "Enterprise applications & backend development",
      duration: "8 Weeks",
      category: "Java Programming",
      badge: "Popular",
      image: "☕",
      positionsAvailable: 38,
      price: "Free"
    },
    {
      title: "Full Stack Development",
      description: "Build real-world web applications using MERN stack",
      duration: "8 Weeks",
      category: "Web Development",
      badge: "Popular",
      image: "💻",
      positionsAvailable: 25,
      price: "Free"
    },
    {
      title: "Mobile App Development",
      description: "Create cross-platform apps with React Native",
      duration: "6 Weeks",
      category: "Mobile App Development",
      badge: "New",
      image: "📱",
      positionsAvailable: 20,
      price: "Free"
    },
    {
      title: "Digital Marketing",
      description: "Master SEO, social media, and content marketing",
      duration: "4 Weeks",
      category: "Digital Marketing",
      badge: "Trending",
      image: "📈",
      positionsAvailable: 30,
      price: "Free"
    }
  ];

  try {
    // Clear existing internships
    await Internship.deleteMany({});
    console.log('Existing internships cleared');

    // Insert new internships
    const createdInternships = await Internship.insertMany(internships);
    console.log(`${createdInternships.length} internships created successfully`);
    return createdInternships;
  } catch (error) {
    console.error('Error seeding internships:', error);
    throw error;
  }
};

const seedAll = async () => {
  try {
    await seedCourses();
    await seedInternships();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

module.exports = { seedCourses, seedInternships, seedAll };


