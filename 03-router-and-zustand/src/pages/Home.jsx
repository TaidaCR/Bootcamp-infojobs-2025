// import { Link } from "../components/Link.js"
import { useRouter} from "../hooks/useRouter.jsx"
import backgroundImage from "../assets/background.webp"
import styles from "./Home.module.css"

export default function HomePage(){
    const {navigateTo} = useRouter()

    const handleSearch = (event) => {
        event.preventDefault()

        const formData = new FormData (event.target)
        const searchTerm = formData.get('search-job')

        const url = searchTerm 
            ? `/search?text=${encodeURIComponent(searchTerm)}`
            : '/search'

        navigateTo(url)
    }

    return (
          <main>
            <section className="relative flex flex-col items-center justify-center px-4 py-16 md:py-24 lg:py-32">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-background-light/95 via-background-light/80 to-background-light z-10">
                    </div>
                    <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    </div>
                </div>
                <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
                    <div className="flex flex-col gap-4 animate-fade-in-up">
                        <h1
                            className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900">
                            Find your <span className="text-primary">dream job</span> today
                        </h1>
                        <p className="text-lg md:text-xl font-normal text-slate-500 max-w-2xl mx-auto">
                            Connect with thousands of top companies hiring now. Your next career move starts here.
                        </p>
                    </div>
                    <div className="w-full max-w-3xl transform transition-all hover:scale-[1.01]">
                        <form onSubmit={handleSearch}
                            className="flex w-full flex-col md:flex-row items-center gap-3 rounded-2xl bg-white p-2 shadow-2xl shadow-primary/10 border-2 border-primary/20 ring-4 ring-primary/5">
                            <div
                                className="flex w-full flex-1 items-center px-4 h-12 md:h-14 border-b md:border-b-0 md:border-r border-slate-100">
                                <span className="material-symbols-outlined text-primary/70 mr-3">search</span>
                                <input name="search-job"
                                    className="h-full w-full bg-transparent text-base font-medium text-slate-900 placeholder-slate-400 outline-none border-none focus:ring-0 p-0"
                                    placeholder="Job title, keywords, or company" type="text" />
                            </div>
                            <div className="flex w-full flex-1 items-center px-4 h-12 md:h-14">
                                <span className="material-symbols-outlined text-primary/70 mr-3">location_on</span>
                                <input
                                    
                                    className="h-full w-full bg-transparent text-base font-medium text-slate-900 placeholder-slate-400 outline-none border-none focus:ring-0 p-0"
                                    placeholder="City, state, or remote" 
                                    type="text" />
                            </div>
                            <button
                                className="w-full md:w-auto h-12 md:h-14 rounded-xl bg-primary px-8 text-white text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined md:hidden">search</span>
                                <span>Search</span>
                            </button>
                        </form>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 pt-4">
                        <span className="text-sm font-medium text-slate-500 py-1">Trending:</span>
                        <a className="flex h-8 items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1 hover:border-primary hover:bg-primary/5 transition-all group shadow-sm"
                            href="#">
                            <span
                                className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-[18px]">public</span>
                            <span
                                className="text-xs md:text-sm font-medium text-slate-600 group-hover:text-primary">Remote</span>
                        </a>
                        <a className="flex h-8 items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1 hover:border-primary hover:bg-primary/5 transition-all group shadow-sm"
                            href="#">
                            <span
                                className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-[18px]">code</span>
                            <span
                                className="text-xs md:text-sm font-medium text-slate-600 group-hover:text-primary">Engineer</span>
                        </a>
                        <a className="flex h-8 items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1 hover:border-primary hover:bg-primary/5 transition-all group shadow-sm"
                            href="#">
                            <span
                                className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-[18px]">campaign</span>
                            <span
                                className="text-xs md:text-sm font-medium text-slate-600 group-hover:text-primary">Marketing</span>
                        </a>
                        <a className="flex h-8 items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1 hover:border-primary hover:bg-primary/5 transition-all group shadow-sm"
                            href="#">
                            <span
                                className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-[18px]">palette</span>
                            <span
                                className="text-xs md:text-sm font-medium text-slate-600 group-hover:text-primary">Design</span>
                        </a>
                    </div>
                </div>
            </section>
            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-10 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            className="flex flex-col items-center md:items-start gap-1 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Active Jobs</p>
                            <div className="flex items-end gap-3">
                                <p className="text-slate-900 text-4xl font-black tracking-tight">120k+</p>
                                <span
                                    className="mb-1 flex items-center text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                    <span className="material-symbols-outlined !text-sm mr-1">trending_up</span> 12%
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex flex-col items-center md:items-start gap-1 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Companies Hiring</p>
                            <div className="flex items-end gap-3">
                                <p className="text-slate-900 text-4xl font-black tracking-tight">5,000+</p>
                                <span
                                    className="mb-1 flex items-center text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                    <span className="material-symbols-outlined !text-sm mr-1">trending_up</span> 5%
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex flex-col items-center md:items-start gap-1 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Resumes Uploaded</p>
                            <div className="flex items-end gap-3">
                                <p className="text-slate-900 text-4xl font-black tracking-tight">1M+</p>
                                <span
                                    className="mb-1 flex items-center text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                    <span className="material-symbols-outlined !text-sm mr-1">trending_up</span> 20%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 md:py-24 px-4 bg-background-light">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    <div className="flex flex-col gap-6 lg:w-1/3 lg:sticky lg:top-32">
                        <div
                            className="inline-flex h-10 w-fit items-center rounded-full bg-primary/10 px-4 text-sm font-bold text-primary">
                            <span className="material-symbols-outlined mr-2 !text-lg">verified</span>
                            Why Choose JobHunt?
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-slate-900">
                            We make your job search <span
                                className="text-primary underline decoration-4 underline-offset-4 decoration-primary/30">easier</span>.
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Stop scrolling through outdated listings. We use advanced matching to connect you with
                            opportunities that fit your skills and salary expectations instantly.
                        </p>
                        <button
                            className="mt-4 flex h-12 w-fit cursor-pointer items-center justify-center overflow-hidden rounded-full bg-slate-900 px-6 text-white text-base font-bold shadow-lg transition-transform hover:scale-105 hover:bg-slate-800">
                            Learn More About Us
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-2/3">
                        <div
                            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined !text-2xl">bolt</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Apply</h3>
                                <p className="text-slate-500">Apply to multiple jobs with a single click using your
                                    optimized profile. No more repetitive forms.</p>
                            </div>
                        </div>
                        <div
                            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined !text-2xl">attach_money</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Salary Transparency</h3>
                                <p className="text-slate-500">See salary ranges upfront on every listing. We believe in
                                    transparency so you don't waste your time.</p>
                            </div>
                        </div>
                        <div
                            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined !text-2xl">verified_user</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Companies</h3>
                                <p className="text-slate-500">We verify every employer to ensure legitimate opportunities
                                    and a safe job hunting environment.</p>
                            </div>
                        </div>
                        <div
                            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined !text-2xl">notifications_active</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Alerts</h3>
                                <p className="text-slate-500">Get notified immediately when a job matching your specific
                                    criteria and preferences is posted.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-16 md:pb-24 px-4">
                <div className="jobs-listings mx-auto max-w-7xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Latest Opportunities</h2>
                        <a className="text-sm font-bold text-primary hover:underline hover:text-primary-dark" href="/jobs.html">View all jobs -&gt;</a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                            className="group relative flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:border-primary hover:shadow-glow">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4 items-center">
                                    <div
                                        className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-slate-400">business</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                                            Senior Product Designer</h3>
                                        <p className="text-sm text-slate-500">TechFlow Inc.</p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">2h
                                    ago</span>
                            </div>
                            <div className="flex flex-wrap gap-2 my-2">
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">Remote</span>
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">Full-time</span>
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">$120k
                                    - $150k</span>
                            </div>
                            <button
                                className="button-apply-job w-full rounded-xl bg-slate-900 group-hover:bg-primary py-3 text-sm font-bold text-white transition-colors">
                                Apply Now
                            </button>
                        </div>
                        <div
                            className="group relative flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:border-primary hover:shadow-glow">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4 items-center">
                                    <div
                                        className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-slate-400">api</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                                            Backend Developer</h3>
                                        <p className="text-sm text-slate-500">DataSystems</p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">5h
                                    ago</span>
                            </div>
                            <div className="flex flex-wrap gap-2 my-2">
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">On-site</span>
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">Contract</span>
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">$90k
                                    - $110k</span>
                            </div>
                            <button
                                className="button-apply-job w-full rounded-xl bg-slate-900 group-hover:bg-primary py-3 text-sm font-bold text-white transition-colors">
                                Apply Now
                            </button>
                        </div>
                        <div
                            className="group relative flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:border-primary hover:shadow-glow">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4 items-center">
                                    <div
                                        className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-slate-400">rocket_launch</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                                            Growth Marketing Lead</h3>
                                        <p className="text-sm text-slate-500">LaunchPad</p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">1d
                                    ago</span>
                            </div>
                            <div className="flex flex-wrap gap-2 my-2">
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">Hybrid</span>
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">Full-time</span>
                                <span
                                    className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-1 text-xs font-medium text-slate-600">$100k
                                    - $130k</span>
                            </div>
                            <button
                                className="button-apply-job w-full rounded-xl bg-slate-900 group-hover:bg-primary py-3 text-sm font-bold text-white transition-colors">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}