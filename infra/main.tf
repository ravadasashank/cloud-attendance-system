# Terraform Configuration for Cloud Attendance System
# AWS Infrastructure as Code

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "cloud-attendance-vpc"
    Environment = var.environment
  }
}

# RDS PostgreSQL Database
resource "aws_db_instance" "postgres" {
  identifier           = "cloud-attendance-db"
  engine              = "postgres"
  engine_version      = "15.3"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  storage_encrypted   = true
  
  db_name  = "attendance_db"
  username = "admin"
  
  skip_final_snapshot = true

  tags = {
    Name        = "cloud-attendance-postgres"
    Environment = var.environment
  }
}

# Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "db_endpoint" {
  description = "Database endpoint"
  value       = aws_db_instance.postgres.endpoint
  sensitive   = true
}
