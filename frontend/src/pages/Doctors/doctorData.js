export const doctorData = [
    {
        id: 1,
        name: 'Dr. Rahul Sharma',
        specialty: 'Surgeon',
        rating: 4.8,
        totalReviews: 272,
        ticketPrice: 500,
        currency: 'INR',
        available: true,
        address: '123 Health St, Sector 5, New Delhi',
        about:
            'Dr. Rahul Sharma is a board-certified surgeon with over 15 years of experience in general and laparoscopic surgery. He is known for his compassionate care and precise surgical technique. He completed his residency at AIIMS Delhi and has authored multiple peer-reviewed papers in surgical innovation.',
        education: [
            { degree: 'MBBS', institution: 'Maulana Azad Medical College', year: '2003' },
            { degree: 'MS (Surgery)', institution: 'AIIMS Delhi', year: '2008' },
            { degree: 'Fellowship', institution: 'Tata Memorial Hospital', year: '2011' },
        ],
        experience: [
            { role: 'Senior Surgeon', hospital: 'Apollo Hospital', years: '2012 – 2018' },
            { role: 'Head of Surgery', hospital: 'Max Super Speciality Hospital', years: '2018 – Present' },
        ],
        timeSlots: [
            { day: 'Sunday', time: '4:00 PM – 9:30 PM' },
            { day: 'Tuesday', time: '4:00 PM – 9:30 PM' },
            { day: 'Wednesday', time: '4:00 PM – 9:30 PM' },
        ],
        reviews: [
            { id: 1, name: 'Amit Singh', date: 'Feb 14, 2023', rating: 5, text: 'Good services, highly recommended' },
            { id: 2, name: 'Sneha Kapoor', date: 'Jan 05, 2023', rating: 4.5, text: 'Very professional doctor. Explained everything clearly.' },
            { id: 3, name: 'Ravi Verma', date: 'Dec 28, 2022', rating: 5, text: 'Excellent experience. Will definitely come back.' },
        ],
    },
    {
        id: 2,
        name: 'Dr. Anjali Gupta',
        specialty: 'Cardiologist',
        rating: 4.7,
        totalReviews: 198,
        ticketPrice: 600,
        currency: 'INR',
        available: true,
        address: '45 Cardiac Care Lane, Banjara Hills, Hyderabad',
        about:
            'Dr. Anjali Gupta is a leading cardiologist with 12 years of specialized experience in interventional cardiology. She has treated thousands of patients with heart conditions and is passionate about preventive cardiac care.',
        education: [
            { degree: 'MBBS', institution: 'Lady Hardinge Medical College', year: '2005' },
            { degree: 'MD (Cardiology)', institution: 'AIIMS Delhi', year: '2010' },
            { degree: 'Fellowship', institution: 'Cleveland Clinic', year: '2013' },
        ],
        experience: [
            { role: 'Consultant Cardiologist', hospital: 'Fortis Hospital', years: '2013 – 2019' },
            { role: 'Senior Cardiologist', hospital: 'Medanta - The Medicity', years: '2019 – Present' },
        ],
        timeSlots: [
            { day: 'Monday', time: '10:00 AM – 2:00 PM' },
            { day: 'Thursday', time: '4:00 PM – 8:00 PM' },
            { day: 'Saturday', time: '9:00 AM – 1:00 PM' },
        ],
        reviews: [
            { id: 1, name: 'Vikram Mehta', date: 'Mar 02, 2023', rating: 5, text: 'Exceptional doctor. Very thorough and attentive.' },
            { id: 2, name: 'Priya Das', date: 'Feb 17, 2023', rating: 4.5, text: 'Great experience, felt very comfortable throughout.' },
        ],
    },
    {
        id: 3,
        name: 'Dr. Ishaan Malhotra',
        specialty: 'Neurologist',
        rating: 4.6,
        totalReviews: 143,
        ticketPrice: 550,
        currency: 'INR',
        available: false,
        address: '88 Neuro Plaza, Indiranagar, Bangalore',
        about:
            'Dr. Ishaan Malhotra specialises in neurological disorders including epilepsy, Parkinson\'s disease, and stroke management. With 10+ years in neurology, he combines cutting-edge diagnostics with a patient-first approach.',
        education: [
            { degree: 'MBBS', institution: 'Kasturba Medical College', year: '2006' },
            { degree: 'MD (Neurology)', institution: 'NIMHANS', year: '2012' },
        ],
        experience: [
            { role: 'Neurologist', hospital: 'NIMHANS', years: '2012 – 2018' },
            { role: 'Senior Neurologist', hospital: 'Manipal Hospital', years: '2018 – Present' },
        ],
        timeSlots: [
            { day: 'Sunday', time: '12:00 PM – 4:00 PM' },
            { day: 'Wednesday', time: '5:00 PM – 9:00 PM' },
        ],
        reviews: [
            { id: 1, name: 'Karan Mehra', date: 'Jan 10, 2023', rating: 5, text: 'Highly knowledgeable, explained my condition very clearly.' },
            { id: 2, name: 'Neha Joshi', date: 'Dec 05, 2022', rating: 4, text: 'Good doctor, a bit of a wait but worth it.' },
        ],
    },
    {
        id: 4,
        name: 'Dr. Priya Sharma',
        specialty: 'Gynecologist',
        rating: 4.9,
        totalReviews: 311,
        ticketPrice: 450,
        currency: 'INR',
        available: true,
        address: 'Suite 210, Women Care Center, Powai, Mumbai',
        about:
            'Dr. Priya Sharma is one of the most trusted gynecologists in the city with 18 years of experience. She specialises in high-risk pregnancies, infertility treatment, and minimally invasive gynecological surgeries.',
        education: [
            { degree: 'MBBS', institution: 'Grant Medical College', year: '2000' },
            { degree: 'MS (Gynecology)', institution: 'KEM Hospital', year: '2006' },
            { degree: 'Fellowship', institution: 'Royal College of Obstetricians', year: '2009' },
        ],
        experience: [
            { role: 'Gynecologist', hospital: 'Jaslok Hospital', years: '2009 – 2015' },
            { role: 'Head of Gynecology', hospital: 'Nanavati Hospital', years: '2015 – Present' },
        ],
        timeSlots: [
            { day: 'Monday', time: '9:00 AM – 1:00 PM' },
            { day: 'Wednesday', time: '2:00 PM – 6:00 PM' },
            { day: 'Friday', time: '10:00 AM – 2:00 PM' },
        ],
        reviews: [
            { id: 1, name: 'Ritika Aggarwal', date: 'Mar 10, 2023', rating: 5, text: 'Best doctor I have ever visited. Very caring and professional.' },
            { id: 2, name: 'Sunita Mishra', date: 'Feb 28, 2023', rating: 5, text: 'Absolutely wonderful experience throughout my pregnancy.' },
            { id: 3, name: 'Anjali Nair', date: 'Jan 15, 2023', rating: 4.5, text: 'Very thorough and reassuring. Highly recommended!' },
        ],
    },
    {
        id: 5,
        name: 'Dr. Rajesh Iyer',
        specialty: 'Oncologist',
        rating: 4.5,
        totalReviews: 89,
        ticketPrice: 700,
        currency: 'INR',
        available: true,
        address: '12 Oncology Wing, Apollo City, Chennai',
        about:
            'Dr. Rajesh Iyer is a dedicated oncologist with expertise in medical oncology and chemotherapy management. He provides comprehensive cancer care with a focus on quality of life and personalised treatment plans.',
        education: [
            { degree: 'MBBS', institution: 'Madras Medical College', year: '2004' },
            { degree: 'MD (Oncology)', institution: 'Kidwai Memorial Institute of Oncology', year: '2011' },
        ],
        experience: [
            { role: 'Oncologist', hospital: 'Kidwai Memorial', years: '2011 – 2017' },
            { role: 'Consultant Oncologist', hospital: 'HCG Cancer Centre', years: '2017 – Present' },
        ],
        timeSlots: [
            { day: 'Tuesday', time: '10:00 AM – 2:00 PM' },
            { day: 'Friday', time: '3:00 PM – 7:00 PM' },
        ],
        reviews: [
            { id: 1, name: 'Sanjay Kumar', date: 'Feb 20, 2023', rating: 5, text: 'A compassionate and highly skilled doctor. Truly grateful.' },
            { id: 2, name: 'Lata Reddy', date: 'Jan 30, 2023', rating: 4, text: 'Professional and thorough in his approach to treatment.' },
        ],
    },
    {
        id: 6,
        name: 'Dr. Sunita Deshmukh',
        specialty: 'Dermatologist',
        rating: 4.8,
        totalReviews: 215,
        ticketPrice: 400,
        currency: 'INR',
        available: false,
        address: 'Skin & Glow Clinic, MG Road, Pune',
        about:
            'Dr. Sunita Deshmukh is an expert dermatologist with 9 years of experience treating skin, hair, and nail conditions. She has a special interest in cosmetic dermatology and acne management.',
        education: [
            { degree: 'MBBS', institution: 'Seth GS Medical College', year: '2008' },
            { degree: 'DDV (Dermatology)', institution: 'T. N. Medical College', year: '2013' },
        ],
        experience: [
            { role: 'Dermatologist', hospital: 'Kaya Skin Clinic', years: '2013 – 2020' },
            { role: 'Senior Dermatologist', hospital: 'Nanavati Hospital', years: '2020 – Present' },
        ],
        timeSlots: [
            { day: 'Monday', time: '3:00 PM – 7:00 PM' },
            { day: 'Thursday', time: '10:00 AM – 2:00 PM' },
        ],
        reviews: [
            { id: 1, name: 'Radhika Patekar', date: 'Mar 05, 2023', rating: 5, text: 'My skin has improved so much after following her advice. Thank you!' },
            { id: 2, name: 'Rohan Deshmukh', date: 'Feb 14, 2023', rating: 4.5, text: 'Very knowledgeable and approachable. Great experience.' },
        ],
    },
    {
        id: 7,
        name: 'Dr. Tanmay Bhatt',
        specialty: 'Orthopedist',
        rating: 4.4,
        totalReviews: 127,
        ticketPrice: 500,
        currency: 'INR',
        available: true,
        address: 'Joint & Bone Center, Satellite Area, Ahmedabad',
        about:
            'Dr. Tanmay Bhatt is an orthopedic surgeon specializing in joint replacement, sports injuries, and spine surgery. He has performed over 1,000 successful orthopedic surgeries throughout his career.',
        education: [
            { degree: 'MBBS', institution: 'BJ Medical College', year: '2007' },
            { degree: 'MS (Orthopedics)', institution: 'KEM Hospital Hospital', year: '2013' },
        ],
        experience: [
            { role: 'Orthopedic Surgeon', hospital: 'Sion Hospital', years: '2013 – 2019' },
            { role: 'Consultant Orthopedist', hospital: 'Saifee Hospital', years: '2019 – Present' },
        ],
        timeSlots: [
            { day: 'Sunday', time: '6:00 PM – 9:00 PM' },
            { day: 'Tuesday', time: '6:00 PM – 9:00 PM' },
            { day: 'Thursday', time: '6:00 PM – 9:00 PM' },
        ],
        reviews: [
            { id: 1, name: 'Sagar Patel', date: 'Feb 01, 2023', rating: 4.5, text: 'Fixed my knee issue perfectly. Very skilled surgeon.' },
            { id: 2, name: 'Jayesh Shah', date: 'Jan 20, 2023', rating: 4, text: 'Professional and efficient. Recovery has been great.' },
        ],
    },
    {
        id: 8,
        name: 'Dr. Shalini Kulkarni',
        specialty: 'Psychiatrist',
        rating: 4.7,
        totalReviews: 176,
        ticketPrice: 480,
        currency: 'INR',
        available: true,
        address: 'Mind Space Tower, Salt Lake, Kolkata',
        about:
            'Dr. Shalini Kulkarni is a compassionate psychiatrist with expertise in anxiety, depression, OCD, and adolescent mental health. She believes in a holistic, evidence-based approach to mental wellness.',
        education: [
            { degree: 'MBBS', institution: 'King George\'s Medical University', year: '2006' },
            { degree: 'MD (Psychiatry)', institution: 'IHBAS', year: '2012' },
            { degree: 'Fellowship', institution: 'King\'s College London', year: '2015' },
        ],
        experience: [
            { role: 'Psychiatrist', hospital: 'VIMHANS', years: '2012 – 2018' },
            { role: 'Consultant Psychiatrist', hospital: 'Aasra Mental Health', years: '2018 – Present' },
        ],
        timeSlots: [
            { day: 'Monday', time: '5:00 PM – 9:00 PM' },
            { day: 'Wednesday', time: '5:00 PM – 9:00 PM' },
            { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
        ],
        reviews: [
            { id: 1, name: 'Tejaswini Rane', date: 'Mar 01, 2023', rating: 5, text: 'Changed my life. So grateful for her guidance and empathy.' },
            { id: 2, name: 'Abhishek Pandey', date: 'Feb 10, 2023', rating: 4.5, text: 'Very understanding and non-judgmental. Highly recommend.' },
            { id: 3, name: 'Soumya Shrivastav', date: 'Jan 05, 2023', rating: 5, text: 'Best mental health professional I have consulted. Exceptional.' },
        ],
    },
]
